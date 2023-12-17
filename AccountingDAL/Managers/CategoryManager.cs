﻿using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;

namespace AccountingDAL.Managers
{
    public class CategoryManager
    {
        public CategoryManager()
        {
        }

        public async Task<IReadOnlyCollection<Сategory>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Сategory> result = await context.Categories.Where(x => !x.Removed).ToListAsync();

            return result.OrderBy(item => item.Name).ToList();
        }

        public async Task<Сategory> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Сategory? stored = await context.Categories.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<Сategory> SetAsync(Сategory category)
        {
            if (category is null)
            {
                throw new ArgumentNullException(nameof(category));
            }

            using var context = new AccountingContext();

            if (category.Id != Guid.Empty && await context.Categories.AnyAsync(item => item.Id == category.Id))
            {
                Сategory stored = await context.Categories.FirstAsync(item => item.Id == category.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(category);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (category.Id == Guid.Empty)
                {
                    category.Id = Guid.NewGuid();
                }

                //создание записи
                Сategory stored = (await context.AddAsync(category)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<Сategory> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Сategory? stored = await context.Categories.FirstOrDefaultAsync(item => item.Id == id);

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
