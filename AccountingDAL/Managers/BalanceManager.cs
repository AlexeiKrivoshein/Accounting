using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.Operations;
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
        /// <param name="operationId">Идентификатор операции</param>
        public async Task<List<Balance>> GetMovementBalanceAsync(Guid operationId)
        {
            using var context = new AccountingContext();

            Operation? operation = await context.ContractorOperations.FirstOrDefaultAsync(x => x.Id == operationId);

            if (operation is null)
            {
                operation = await context.TransferOperations.FirstOrDefaultAsync(x => x.Id == operationId);
            }

            if (operation is null)
            {
                operation = await context.CorrectionOperations.FirstOrDefaultAsync(x => x.Id == operationId);
            }

            if (operation is null)
            {
                operation = await context.CashOperations.FirstOrDefaultAsync(x => x.Id == operationId);
            }

            if (operation is null)
            {
                throw new Exception($"На найдена операция/перевод/корректировка с идентикатором {operationId}.");
            }

            List<Balance> balances = new List<Balance>();
            foreach (Account account in await context.Accounts.ToListAsync())
            {
                Balance balance = await CalculateBalanceAsync(context, (operation.Date, operation.Index), account);
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
            List<Operation> operations = new List<Operation>();
            List<ContractorOperation> contractorOperations = new List<ContractorOperation>();
            List<TransferOperation> transfersOperations = new List<TransferOperation>();
            List<CorrectionOperation> correctionOperations = new List<CorrectionOperation>();
            List<CashOperation> cashOperations = new List<CashOperation>();

            // нет расчитанных балансов, суммируем все операции и переводы
            if (balance is null)
            {
                // все предыдущие операции с контрагентами по счету
                contractorOperations = await context.ContractorOperations
                    .Where(x => x.AccountID == account.Id && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // все предыдущие внутренние переводы по счету
                transfersOperations = await context.TransferOperations
                    .Where(x => (x.CreditAccountID == account.Id || x.DebitAccountID == account.Id) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // все предыдущие корректировки по счету
                correctionOperations = await context.CorrectionOperations
                    .Where(x => x.AccountID == account.Id && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // все предыдущие операции с наличными по счету
                cashOperations = await context.CashOperations
                    .Where(x => x.AccountID == account.Id && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();
            }
            else
            {
                // сумма баланса = баланс предыдущего счета + все движения
                sum = balance.Sum;

                // операции с контрагентом от последнего баланса и до движения
                contractorOperations = await context.ContractorOperations
                    .Where(x => x.AccountID == account.Id && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // переводы от последнего баланса и до движения
                transfersOperations = await context.TransferOperations
                    .Where(x => (x.CreditAccountID == account.Id || x.DebitAccountID == account.Id) && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // корректировки от последнего баланса и до движения
                correctionOperations = await context.CorrectionOperations
                    .Where(x => x.AccountID == account.Id && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();

                // операцции с наличными от последнего баланса и до движения
                cashOperations = await context.CashOperations
                    .Where(x => x.AccountID == account.Id && (x.Date > balance.Date) && (x.Date < date || (x.Date == date && x.Index <= index)))
                    .ToListAsync();
            }

            // оперции с контрагентом, корректировки, переводы и операции с наличными в одном списке, отсортированном по дате и индексу
            operations.AddRange(contractorOperations.Cast<Operation>());
            operations.AddRange(transfersOperations.Cast<Operation>());
            operations.AddRange(correctionOperations.Cast<Operation>());
            operations.AddRange(cashOperations.Cast<Operation>());

            operations = operations.OrderBy(x => x.Date).ThenBy(x => x.Index).ToList();

            // подсчет баланса счета
            foreach (Operation operation in operations)
            {
                if (operation is ContractorOperation contractorOperation)
                {
                    if (contractorOperation.OperationType == OperationType.Credited)
                    {
                        sum -= operation.Sum;
                    }
                    else
                    {
                        sum += operation.Sum;
                    }
                }
                else if (operation is TransferOperation transferOperation)
                {
                    if (transferOperation.CreditAccountID == account.Id)
                    {
                        sum -= operation.Sum;
                    }
                    else
                    {
                        sum += operation.Sum;
                    }
                }
                else if (operation is CorrectionOperation correctionOperation)
                {
                    if (correctionOperation.OperationType == OperationType.Credited)
                    {
                        sum -= operation.Sum;
                    }
                    else
                    {
                        sum += operation.Sum;
                    }
                }
                else if (operation is CashOperation cashOperation)
                {
                    if (cashOperation.OperationType == OperationType.Credited)
                    {
                        sum -= operation.Sum;
                    }
                    else
                    {
                        sum += operation.Sum;
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
            ContractorOperation? contractorOperation = null;
            TransferOperation? transferOperation = null;
            CorrectionOperation? correctionOperation = null;
            CashOperation? cashOperation = null;

            List<Account> accounts = new List<Account>();

            using (var context = new AccountingContext())
            {
                contractorOperation = await context.ContractorOperations
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                transferOperation = await context.TransferOperations
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                correctionOperation = await context.CorrectionOperations
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                cashOperation = await context.CashOperations
                    .OrderBy(x => x.Date)
                    .FirstOrDefaultAsync();

                accounts = await context.Accounts.ToListAsync();
            }

            if ((contractorOperation is null && transferOperation is null && correctionOperation is null && cashOperation is null) || !accounts.Any())
            {
                return;
            }

            DateTime date = new[]
            {
                contractorOperation?.Date ?? DateTime.MaxValue,
                transferOperation?.Date ?? DateTime.MaxValue,
                correctionOperation?.Date ?? DateTime.MaxValue,
                cashOperation?.Date ?? DateTime.MaxValue
            }.Min();

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
