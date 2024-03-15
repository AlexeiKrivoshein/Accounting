using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Dictionaries;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public class CardManager
    {
        public CardManager()
        {
        }

        public async Task<IReadOnlyCollection<Card>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Card> result = await context.Cards.Where(x => !x.Removed).ToListAsync();

            return result.OrderBy(item => item.Name).ToList();
        }

        public async Task<Card> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Card? stored = await context.Cards.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<Card> SetAsync(Card card)
        {
            if (card is null)
            {
                throw new ArgumentNullException(nameof(card));
            }

            using var context = new AccountingContext();

            if (card.Id != Guid.Empty && await context.Cards.AnyAsync(item => item.Id == card.Id))
            {
                Card stored = await context.Cards.FirstAsync(item => item.Id == card.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(card);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (card.Id == Guid.Empty)
                {
                    card.Id = Guid.NewGuid();
                }

                //создание записи
                Card stored = (await context.AddAsync(card)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<Card> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Card? stored = await context.Cards.FirstOrDefaultAsync(item => item.Id == id);

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
