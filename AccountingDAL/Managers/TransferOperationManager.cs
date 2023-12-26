using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Operations;
using Microsoft.EntityFrameworkCore;

namespace AccountingDAL.Managers
{
    public class TransferOperationManager : OperationManagerBase
    {
        public TransferOperationManager()
        {
        }

        public async Task<IReadOnlyCollection<TransferOperation>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<TransferOperation> result = await context.TransferOperations
                .Include(item => item.CreditAccount)
                .Include(item => item.DebitAccount)
                .OrderBy(item => item.Date)
                .ThenBy(item => item.Index)
                .ToListAsync();

            return result.ToList();
        }

        public async Task<TransferOperation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            TransferOperation? stored = await context.TransferOperations
                .Include(item => item.CreditAccount)
                .Include(item => item.DebitAccount)
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
