using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using Azure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public class TransferManager : MovementManagerBase
    {
        public TransferManager()
        {
        }

        public async Task<IReadOnlyCollection<Transfer>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Transfer> result = await context.Transfers
                .Include(item => item.CreditAccount)
                .Include(item => item.DebitAccount)
                .OrderBy(item => item.Date)
                .ThenBy(item => item.Index)
                .ToListAsync();

            return result.ToList();
        }

        public async Task<Transfer> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Transfer? stored = await context.Transfers
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

        public async Task<Transfer> SetAsync(Transfer transfer)
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

            if (transfer.Id != Guid.Empty && await context.Transfers.AnyAsync(item => item.Id == transfer.Id))
            {
                Transfer stored = await context.Transfers.FirstAsync(item => item.Id == transfer.Id);

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
                Transfer stored = (await context.AddAsync(transfer)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<Transfer> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Transfer? stored = await context.Transfers.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.Transfers.Remove(stored);
                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}
