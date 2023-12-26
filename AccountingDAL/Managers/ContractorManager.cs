using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using Microsoft.EntityFrameworkCore;

namespace AccountingDAL.Managers
{
    public class ContractorManager
    {
        public ContractorManager()
        {
        }

        public async Task<IReadOnlyCollection<Contractor>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Contractor> result = await context.Contractors.Where(x => !x.Removed).Include(item => item.Category).ToListAsync();

            return result.OrderBy(item => item.Name).ToList();
        }

        public async Task<Contractor> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Contractor? stored = await context.Contractors
                .Include(item => item.Category)
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

        public async Task<Contractor> SetAsync(Contractor contractor)
        {
            if (contractor is null)
            {
                throw new ArgumentNullException(nameof(contractor));
            }

            using var context = new AccountingContext();

            if (contractor.Id != Guid.Empty && await context.Contractors.AnyAsync(item => item.Id == contractor.Id))
            {
                Contractor stored = await context.Contractors.FirstAsync(item => item.Id == contractor.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(contractor);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (contractor.Id == Guid.Empty)
                {
                    contractor.Id = Guid.NewGuid();
                }

                //создание записи
                Contractor stored = (await context.AddAsync(contractor)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<Contractor> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Contractor? stored = await context.Contractors.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                stored.Removed = true;
                stored.RemovedDate = DateTime.Now;
                context.Entry(stored).State = EntityState.Modified;

                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}