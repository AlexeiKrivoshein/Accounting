using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using Microsoft.EntityFrameworkCore;

namespace AccountingDAL.Managers
{
    public class AccountManager
    {
        public AccountManager()
        {
        }

        public async Task<IReadOnlyCollection<Account>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Account> result = await context.Accounts.Where(x => !x.Removed).ToListAsync();

            return result.OrderBy(item => item.Name).ToList();
        }

        public async Task<Account> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Account? stored = await context.Accounts.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<Account> SetAsync(Account account)
        {
            if (account is null)
            {
                throw new ArgumentNullException(nameof(account));
            }

            using var context = new AccountingContext();

            if (account.Id != Guid.Empty && await context.Accounts.AnyAsync(item => item.Id == account.Id))
            {
                Account stored = await context.Accounts.FirstAsync(item => item.Id == account.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(account);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (account.Id == Guid.Empty)
                {
                    account.Id = Guid.NewGuid();
                }

                //создание записи
                Account stored = (await context.AddAsync(account)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<Account> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Account? stored = await context.Accounts.FirstOrDefaultAsync(item => item.Id == id);

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
