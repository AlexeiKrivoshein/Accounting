using AccountingDAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AccountingDAL.Exceptions;

namespace AccountingDAL.Managers
{
    public class CorrectionManager : MovementManagerBase
    {
        public CorrectionManager()
        {
        }

        public async Task<IReadOnlyCollection<Correction>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Correction> result = await context.Corrections
                .Include(item => item.Account)
                .OrderBy(item => item.Date)
                .ThenBy(item => item.Index)
                .ToListAsync();

            return result.ToList();
        }

        public async Task<Correction> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Correction? stored = await context.Corrections
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

        public async Task<Correction> SetAsync(Correction correction)
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

            if (correction.Id != Guid.Empty && await context.Corrections.AnyAsync(item => item.Id == correction.Id))
            {
                Correction stored = await context.Corrections.FirstAsync(item => item.Id == correction.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(correction);
                context.SaveChanges();

                return stored;
            }
            else
            {
                if (correction.Id == Guid.Empty)
                {
                    correction.Id = Guid.NewGuid();
                }

                //создание записи
                Correction stored = (await context.AddAsync(correction)).Entity;
                context.SaveChanges();

                return stored;
            }
        }

        public async Task<Correction> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Correction? stored = await context.Corrections.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.Corrections.Remove(stored);
                context.SaveChanges();
            }

            return stored;
        }
    }
}
