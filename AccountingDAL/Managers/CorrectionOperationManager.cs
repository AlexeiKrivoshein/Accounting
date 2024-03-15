using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using AccountingDAL.Exceptions;
using AccountingDAL.Model.Operations;
using Microsoft.EntityFrameworkCore.Query;
using AccountingDAL.Model.Dictionaries;
using System.Linq.Dynamic.Core;

namespace AccountingDAL.Managers
{
    public class CorrectionOperationManager : OperationManagerBase
    {
        public CorrectionOperationManager()
        {
        }

        public async Task<IReadOnlyCollection<CorrectionOperation>> GetAllAsync(Dictionary<string, string> filters)
        {
            using var context = new AccountingContext();
            IIncludableQueryable<CorrectionOperation, AccountBase?> select = context.CorrectionOperations
                .Include(item => item.DepositAccount as AccountBase)
                .Include(item => item.Card as AccountBase);

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

        public async Task<CorrectionOperation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            CorrectionOperation? stored = await context.CorrectionOperations
                .Include(item => item.Card)
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
