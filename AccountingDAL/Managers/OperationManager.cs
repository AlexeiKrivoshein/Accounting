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
    public class OperationManager : MovementManagerBase
    {
        public OperationManager()
        {
        }

        public async Task<IReadOnlyCollection<Operation>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Operation> result = await context.Operations
                .Include(item => item.Account)
                .Include(item => item.Category)
                .Include(item => item.Contractor)
                .OrderBy(item => item.Date)
                .ThenBy(item => item.Index)
                .ToListAsync();

            return result.ToList();
        }

        public async Task<Operation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Operation? stored = await context.Operations
                .Include(item => item.Account)
                .Include(item => item.Category)
                .Include(item => item.Contractor)
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

            if (operation.Index < 0)
            {
                operation.Index = await GetNextIndexAsync(operation.Date);
            }

            // время ввода операции хранить нет необходимости
            operation.Date = new DateTime(operation.Date.Year, operation.Date.Month, operation.Date.Day, 0, 0, 0);

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
