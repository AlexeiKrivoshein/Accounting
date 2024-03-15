using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.Operations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Reflection;
using System.Linq.Dynamic.Core;
using System.Text;

namespace AccountingDAL.Managers
{
    public class ContractorOperationManager : OperationManagerBase
    {
        public ContractorOperationManager()
        {
        }

        public async Task<IReadOnlyCollection<ContractorOperation>> GetAllAsync(Dictionary<string, string> filters)
        {
            using var context = new AccountingContext();
            IIncludableQueryable<ContractorOperation, Contractor> select = context.ContractorOperations
                .Include(item => item.Card)
                .Include(item => item.Category)
                .Include(item => item.Contractor);

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

        public async Task<ContractorOperation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            ContractorOperation? stored = await context.ContractorOperations
                .Include(item => item.Card)
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

        public async Task<ContractorOperation> SetAsync(ContractorOperation operation)
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

            if (operation.Id != Guid.Empty && await context.ContractorOperations.AnyAsync(item => item.Id == operation.Id))
            {
                ContractorOperation stored = await context.ContractorOperations.FirstAsync(item => item.Id == operation.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(operation);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (operation.Id == Guid.Empty)
                {
                    operation.Id = Guid.NewGuid();
                }

                //создание записи
                ContractorOperation stored = (await context.AddAsync(operation)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<ContractorOperation> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            ContractorOperation? stored = await context.ContractorOperations.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.ContractorOperations.Remove(stored);
                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}
