using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using AccountingDAL.Exceptions;
using AccountingDAL.Model.Operations;

namespace AccountingDAL.Managers
{
    public class CorrectionOperationManager : OperationManagerBase
    {
        public CorrectionOperationManager()
        {
        }

        public async Task<IReadOnlyCollection<CorrectionOperation>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<CorrectionOperation> result = await context.CorrectionOperations
                .Include(item => item.Account)
                .OrderBy(item => item.Date)
                .ThenBy(item => item.Index)
                .ToListAsync();

            return result.ToList();
        }

        public async Task<CorrectionOperation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            CorrectionOperation? stored = await context.CorrectionOperations
                .Include(item => item.Account)
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

        public async Task<CorrectionOperation> SetAsync(CorrectionOperation correction)
        {
            if (correction is null)
            {
                throw new ArgumentNullException(nameof(correction));
            }

            using var context = new AccountingContext();

            if (correction.Index < 0)
            {
                correction.Index = await GetNextIndexAsync(correction.Date);
            }

            // время ввода операции хранить нет необходимости
            correction.Date = new DateTime(correction.Date.Year, correction.Date.Month, correction.Date.Day);

            if (correction.Id != Guid.Empty && await context.CorrectionOperations.AnyAsync(item => item.Id == correction.Id))
            {
                CorrectionOperation stored = await context.CorrectionOperations.FirstAsync(item => item.Id == correction.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(correction);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (correction.Id == Guid.Empty)
                {
                    correction.Id = Guid.NewGuid();
                }

                //создание записи
                CorrectionOperation stored = (await context.AddAsync(correction)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<CorrectionOperation> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            CorrectionOperation? stored = await context.CorrectionOperations.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.CorrectionOperations.Remove(stored);
                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}
