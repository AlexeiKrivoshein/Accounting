using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public class OperationManager
    {
        public OperationManager()
        {
        }

        public async Task<IReadOnlyCollection<Operation>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Operation> result = await context.Operations.ToListAsync();

            return result;
        }

        public async Task<Operation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Operation? stored = await context.Operations
                .Include(item => item.Account)
                .Include(item => item.OperationGroup)
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

        public async Task<Operation> SetAsync(Operation operation)
        {
            if (operation is null)
            {
                throw new ArgumentNullException(nameof(operation));
            }

            using var context = new AccountingContext();

            if (operation.Id != Guid.Empty && await context.Operations.AnyAsync(item => item.Id == operation.Id))
            {
                Operation stored = await context.Operations.FirstAsync(item => item.Id == operation.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(operation);
                context.SaveChanges();

                return stored;
            }
            else
            {
                if (operation.Id == Guid.Empty)
                {
                    operation.Id = Guid.NewGuid();
                }

                //создание записи
                Operation stored = (await context.AddAsync(operation)).Entity;
                context.SaveChanges();

                return stored;
            }
        }

        public async Task<Operation> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Operation? stored = await context.Operations.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.Operations.Remove(stored);
                context.SaveChanges();
            }

            return stored;
        }
    }
}
