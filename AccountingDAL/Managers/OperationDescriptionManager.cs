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
    public class OperationDescriptionManager
    {
        public OperationDescriptionManager()
        {
        }

        public async Task<IReadOnlyCollection<OperationDescription>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<OperationDescription> result = await context.OperationDescriptions.ToListAsync();

            return result;
        }

        public async Task<OperationDescription> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            OperationDescription? stored = await context.OperationDescriptions
                .Include(item => item.DefaultOperationGroup)
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

        public async Task<OperationDescription> SetAsync(OperationDescription operationDescription)
        {
            if (operationDescription is null)
            {
                throw new ArgumentNullException(nameof(operationDescription));
            }

            using var context = new AccountingContext();

            if (operationDescription.Id != Guid.Empty && await context.OperationDescriptions.AnyAsync(item => item.Id == operationDescription.Id))
            {
                OperationDescription stored = await context.OperationDescriptions.FirstAsync(item => item.Id == operationDescription.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(operationDescription);
                context.SaveChanges();

                return stored;
            }
            else
            {
                if (operationDescription.Id == Guid.Empty)
                {
                    operationDescription.Id = Guid.NewGuid();
                }

                //создание записи
                OperationDescription stored = (await context.AddAsync(operationDescription)).Entity;
                context.SaveChanges();

                return stored;
            }
        }

        public async Task<OperationDescription> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            OperationDescription? stored = await context.OperationDescriptions.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.OperationDescriptions.Remove(stored);
                context.SaveChanges();
            }

            return stored;
        }
    }
}