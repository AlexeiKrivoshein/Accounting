using AccountingDAL.Exceptions;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public class DepositAccountManager
    {
        public DepositAccountManager()
        {
        }

        public async Task<IReadOnlyCollection<DepositAccount>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<DepositAccount> result = await context.DepositAccounts.Where(x => !x.Removed).ToListAsync();

            return result.OrderBy(item => item.Name).ToList();
        }

        public async Task<DepositAccount> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            DepositAccount? stored = await context.DepositAccounts.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<DepositAccount> SetAsync(DepositAccount depositAccount)
        {
            if (depositAccount is null)
            {
                throw new ArgumentNullException(nameof(depositAccount));
            }

            using var context = new AccountingContext();

            if (depositAccount.Id != Guid.Empty && await context.DepositAccounts.AnyAsync(item => item.Id == depositAccount.Id))
            {
                DepositAccount stored = await context.DepositAccounts.FirstAsync(item => item.Id == depositAccount.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(depositAccount);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (depositAccount.Id == Guid.Empty)
                {
                    depositAccount.Id = Guid.NewGuid();
                }

                //создание записи
                DepositAccount stored = (await context.AddAsync(depositAccount)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<DepositAccount> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            DepositAccount? stored = await context.DepositAccounts.FirstOrDefaultAsync(item => item.Id == id);

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
