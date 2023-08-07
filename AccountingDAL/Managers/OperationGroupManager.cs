using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;

namespace AccountingDAL.Managers
{
    public class OperationGroupManager
    {
        public OperationGroupManager()
        {
        }

        public async Task<IReadOnlyCollection<OperationGroup>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<OperationGroup> result = await context.OperationGroups.ToListAsync();

            return result;
        }

        public async Task<OperationGroup> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            OperationGroup? stored = await context.OperationGroups.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<OperationGroup> SetAsync(OperationGroup group)
        {
            if (group is null)
            {
                throw new ArgumentNullException(nameof(group));
            }

            using var context = new AccountingContext();

            if (group.Id != Guid.Empty && await context.OperationGroups.AnyAsync(item => item.Id == group.Id))
            {
                OperationGroup stored = await context.OperationGroups.FirstAsync(item => item.Id == group.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(group);
                context.SaveChanges();

                return stored;
            }
            else
            {
                if (group.Id == Guid.Empty)
                {
                    group.Id = Guid.NewGuid();
                }

                //создание записи
                OperationGroup stored = (await context.AddAsync(group)).Entity;
                context.SaveChanges();

                return stored;
            }
        }

        public async Task<OperationGroup> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            OperationGroup? stored = await context.OperationGroups.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.OperationGroups.Remove(stored);
                context.SaveChanges();
            }

            return stored;
        }
    }
}
