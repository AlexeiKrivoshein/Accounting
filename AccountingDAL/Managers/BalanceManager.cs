using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace AccountingDAL.Managers
{
    /// <summary>
    /// Менеджер баланса
    /// </summary>
    public class BalanceManager
    {
        public BalanceManager()
        {
            int day = DateTime.Now.Day;
            Timer timer = new Timer((state) =>
            {
                if (day != DateTime.Now.Day)
                {
                    CalculateAndStoreBalancesAsync().Wait();
                    day = DateTime.Now.Day;
                }
            }, null, TimeSpan.FromHours(1), TimeSpan.FromHours(1));
        }

        /// <summary>
        /// Расчет баланса всех счетов на конец дня date
        /// </summary>
        /// <param name="date">Дата баланса(всегда конец дня)</param>
        public async Task CalculateAsync(DateTime date)
        {
            List<Account>? accounts = null;
            List<Balance>? recalculate = null;
            using (var context = new AccountingContext())
            {
                accounts = await context.Accounts.ToListAsync();

                // балансы нуждающиеся в пересчете, после составления текущих
                recalculate = await context.Balances.Where(balance => balance.Date > new DateTime(date.Year, date.Month, date.Day, 23, 59, 59)).ToListAsync();
            }

            if (accounts is null || !accounts.Any())
            {
                return;
            }

            // пересчет текущего баланса
            foreach (Account account in accounts)
            {
                await CalculateAndStoreBalanceAsync(date, account.Id);
            }

            if (recalculate is null || !recalculate.Any())
            {
                return;
            }

            // пересчет балансов позже даты текущего
            foreach (var balance in recalculate)
            {
                await CalculateAndStoreBalanceAsync(balance.Date, balance.AccountID);
            }
        }

        /// <summary>
        /// Получить баланс счетов на момент движения
        /// </summary>
        /// <param name="movementId">Идентификатор движения</param>
        public async Task<List<Balance>> GetMovementBalanceAsync(Guid movementId)
        {
            using var context = new AccountingContext();

            Movement? movement = await context.Operations.FirstOrDefaultAsync(x => x.Id == movementId);

            if (movement is null)
            {
                movement = await context.Transfers.FirstOrDefaultAsync(x => x.Id == movementId);
            }

            if (movement is null)
            {
                movement = await context.Corrections.FirstOrDefaultAsync(x => x.Id == movementId);
            }

            if (movement is null)
            {
                throw new Exception($"На найдена операция/перевод/корректировка с идентикатором {movementId}.");
            }

            List<Balance> balances = new List<Balance>();
            foreach (Account account in await context.Accounts.ToListAsync())
            {
                Balance balance = await CalculateBalanceAsync(context, (movement.Date, movement.Index), account);
                balances.Add(balance);
            }

            return balances;
        }

        /// <summary>
        /// Расчет баланса на момент moment
        /// </summary>
        /// <param name="context">Контекст данных</param>
        /// <param name="moment">Момент(дата и индекс операции)</param>
        /// <param name="accountId">Ключ счета</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private async Task<Balance> CalculateBalanceAsync(AccountingContext context, (DateTime Date, int Index) moment, Guid accountId)
        {
            Account? account = await context.Accounts.FirstOrDefaultAsync(x => x.Id == accountId);

            if (account is null)
            {
                throw new Exception($"На найден счет с идентикатором {accountId}.");
            }

            return await CalculateBalanceAsync(context, moment, account);
        }

        /// <summary>
        /// Расчет баланса на момент moment
        /// </summary>
        /// <param name="context">Контекст данных</param>
        /// <param name="moment">Момент(дата и индекс операции)</param>
        /// <param name="account">Счет</param>
        /// <returns></returns>
        private async Task<Balance> CalculateBalanceAsync(AccountingContext context, (DateTime Date, int Index) moment, Account account)
        {
            int index = moment.Index < 0 ? int.MaxValue : moment.Index;
            DateTime date = moment.Date;

            // последний баланс для счета и даты операции
            Balance? balance = await context.Balances.
                Where(x => x.Date < new DateTime(date.Year, date.Month, date.Day, 0, 0, 0) && x.AccountID == account.Id).
                OrderByDescending(x => x.Date).
                FirstOrDefaultAsync();

            float sum = 0F;
            List<Movement> movements = new List<Movement>();
            List<Operation> operations = new List<Operation>();
            List<Transfer> transfers = new List<Transfer>();
            List<Correction> corrections = new List<Correction>();

            // нет расчитанных балансов, суммируем все операции и переводы
            if (balance is null)
            {
                // все предыдущие операции по счету
                operations = await context.Operations
                    .Where(x => x.AccountID == account.Id && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // все предыдущие переводы по счету
                transfers = await context.Transfers
                    .Where(x => (x.CreditAccountID == account.Id || x.DebitAccountID == account.Id) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // все предыдущие корректировки по счету
                corrections = await context.Corrections
                    .Where(x => x.AccountID == account.Id && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();
            }
            else
            {
                // сумма баланса = баланс предыдущего счета + все движения
                sum = balance.Sum;

                // операции от последнего баланса и до движения
                operations = await context.Operations
                    .Where(x => x.AccountID == account.Id && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // переводы от последнего баланса и до движения
                transfers = await context.Transfers
                    .Where(x => (x.CreditAccountID == account.Id || x.DebitAccountID == account.Id) && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // корректировки от последнего баланса и до движения
                corrections = await context.Corrections
                    .Where(x => x.AccountID == account.Id && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();
            }

            // оперции и переводы в одном списке, отсортированном по дате и индексу
            movements.AddRange(operations.Cast<Movement>());
            movements.AddRange(transfers.Cast<Movement>());
            movements.AddRange(corrections.Cast<Movement>());

            movements = movements.OrderBy(x => x.Date).ThenBy(x => x.Index).ToList();

            // подсчет баланса счета
            foreach (Movement item in movements)
            {
                if (item is Operation operation)
                {
                    if (operation.OperationType == OperationType.Credited)
                    {
                        sum -= item.Sum;
                    }
                    else
                    {
                        sum += item.Sum;
                    }
                }
                else if (item is Transfer transfer)
                {
                    if (transfer.CreditAccountID == account.Id)
                    {
                        sum -= item.Sum;
                    }
                    else
                    {
                        sum += item.Sum;
                    }
                }
                else if (item is Correction correction)
                {
                    if (correction.OperationType == OperationType.Credited)
                    {
                        sum -= item.Sum;
                    }
                    else
                    {
                        sum += item.Sum;
                    }
                }
            }

            balance = new Balance
            {
                Sum = sum,
                AccountID = account.Id,
                Account = account,
                Date = date
            };

            return balance;
        }

        /// <summary>
        /// Перерасчет и балансов за всё время по всем счетам
        /// </summary>
        /// <returns></returns>
        public async Task CalculateAndStoreBalancesAsync()
        {
            Operation? operation = null;
            Transfer? transfer = null;
            Correction? correction = null;

            List<Account> accounts = new List<Account>();

            using (var context = new AccountingContext())
            {
                operation = await context.Operations
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                transfer = await context.Transfers
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                correction = await context.Corrections
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                accounts = await context.Accounts.ToListAsync();
            }

            if ((operation is null && transfer is null && correction is null) || !accounts.Any())
            {
                return;
            }

            DateTime date = new[] { operation?.Date ?? DateTime.MaxValue, transfer?.Date ?? DateTime.MaxValue, correction?.Date ?? DateTime.MaxValue }.Min();

            DateTime current = new DateTime(date.Year, date.Month, date.Day, 23, 59, 59);
            DateTime end = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);
            while (current < end)
            {
                foreach (Account account in accounts)
                {
                    await CalculateAndStoreBalanceAsync(current, account.Id);
                }

                current = current.AddDays(1);
            }
        }

        /// <summary>
        /// Перерасчет баланса за на дату, по счету
        /// </summary>
        /// <param name="date">Дата расчета</param>
        /// <param name="accountId">Счет</param>
        /// <returns></returns>
        private async Task CalculateAndStoreBalanceAsync(DateTime date, Guid accountId)
        {
            using var context = new AccountingContext();

            // пересчет баланса на дату date для счета account
            Balance balance = await CalculateBalanceAsync(context, (date, -1), accountId);

            // перезаписать существующий баланс
            Balance? exists = await context.Balances.
                FirstOrDefaultAsync(x => x.Date == new DateTime(date.Year, date.Month, date.Day, 23, 59, 59) && x.AccountID == accountId);

            if (exists is not null)
            {
                if (exists.Sum != balance.Sum)
                {
                    context.Balances.Remove(exists);
                }
                else
                {
                    return;
                }
            }

            context.Balances.Add(balance);
            await context.SaveChangesAsync();
        }

        /// <summary>
        /// Получение всех балансов
        /// </summary>
        /// <returns></returns>
        public async Task<IReadOnlyCollection<Balance>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Balance> result = await context.Balances
                .Include(item => item.Account)
                .OrderBy(item => item.Date)
                .ThenBy(item => item.Account.Name)
                .ToListAsync();

            return result.ToList();
        }
    }
}
