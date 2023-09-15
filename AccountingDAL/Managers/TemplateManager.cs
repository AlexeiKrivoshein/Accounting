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
    public class TemplateManager
    {
        public TemplateManager()
        {
        }

        public async Task<IReadOnlyCollection<Template>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Template> result = await context.Templates.Include(item => item.DefaultCategory).ToListAsync();

            return result;
        }

        public async Task<Template> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Template? stored = await context.Templates
                .Include(item => item.DefaultCategory)
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

        public async Task<Template> SetAsync(Template template)
        {
            if (template is null)
            {
                throw new ArgumentNullException(nameof(template));
            }

            using var context = new AccountingContext();

            if (template.Id != Guid.Empty && await context.Templates.AnyAsync(item => item.Id == template.Id))
            {
                Template stored = await context.Templates.FirstAsync(item => item.Id == template.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(template);
                context.SaveChanges();

                return stored;
            }
            else
            {
                if (template.Id == Guid.Empty)
                {
                    template.Id = Guid.NewGuid();
                }

                //создание записи
                Template stored = (await context.AddAsync(template)).Entity;
                context.SaveChanges();

                return stored;
            }
        }

        public async Task<Template> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Template? stored = await context.Templates.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.Templates.Remove(stored);
                context.SaveChanges();
            }

            return stored;
        }
    }
}