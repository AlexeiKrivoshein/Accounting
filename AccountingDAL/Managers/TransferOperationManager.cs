using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.Operations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Dynamic.Core;

namespace AccountingDAL.Managers
{
    public class TransferOperationManager : OperationManagerBase
    {
        public TransferOperationManager()
        {
        }

        public async Task<IReadOnlyCollection<TransferOperation>> GetAllAsync(Dictionary<string, string> filters)
        {
            using var context = new AccountingContext();
            IIncludableQueryable<TransferOperation, AccountBase?> select = context.TransferOperations
                .Include(item => item.CreditDepositAccount)
                .Include(item => item.CreditCard)
                .Include(item => item.DebitDepositAccount)
                .Include(item => item.DebitCard);

            string where = FilterFormater.FilterToQuery(filters);
            if (where.Length > 0)
            {
                return await select.Where(where)
                    .OrderBy(item => item.Date)
                    .ThenBy(item => item.Index)
                    .ToListAsync();
            }
            else
            {
                return await select.OrderBy(item => item.Date)
                    .ThenBy(item => item.Index)
                    .ToListAsync();
            }
        }

        public async Task<TransferOperation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            TransferOperation? stored = await context.TransferOperations
                .Include(item => item.CreditDepositAccount)
                .Include(item => item.CreditCard)
                .Include(item => item.DebitDepositAccount)
                .Include(item => item.DebitCard)
                .FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<TransferOperation> SetAsync(TransferOperation transfer)
        {
            if (transfer is null)
            {
                throw new ArgumentNullException(nameof(transfer));
            }

            using var context = new AccountingContext();

            if (transfer.Index < 0)
            {
                transfer.Index = await GetNextIndexAsync(transfer.Date);
            }

            // время ввода операции хранить нет необходимости
            transfer.Date = new DateTime(transfer.Date.Year, transfer.Date.Month, transfer.Date.Day);

            if (transfer.Id != Guid.Empty && await context.TransferOperations.AnyAsync(item => item.Id == transfer.Id))
            {
                TransferOperation stored = await context.TransferOperations.FirstAsync(item => item.Id == transfer.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(transfer);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (transfer.Id == Guid.Empty)
                {
                    transfer.Id = Guid.NewGuid();
                }

                //создание записи
                TransferOperation stored = (await context.AddAsync(transfer)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<TransferOperation> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            TransferOperation? stored = await context.TransferOperations.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.TransferOperations.Remove(stored);
                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}
