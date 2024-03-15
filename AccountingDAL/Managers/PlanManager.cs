using AccountingDAL.Exceptions;
using AccountingDAL.Model;
using AccountingDAL.Model.Plans;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AccountingDAL.Managers
{
    public class PlanManager
    {
        public async Task<IReadOnlyCollection<Plan>> GetAllAsync()
        {
            using var context = new AccountingContext();
            List<Plan> result = await context.Plans.ToListAsync();

            return result.OrderBy(item => item.StartDate).ToList();
        }

        public async Task<Plan> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            Plan? stored = await context.Plans.
                Include(x => x.Savings).ThenInclude(x => x.DepositAccount).
                Include(x => x.Spendings).ThenInclude(x => x.Category).
                FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                return stored;
            }
        }

        public async Task<Plan> SetAsync(Plan plan)
        {
            if (plan is null)
            {
                throw new ArgumentNullException(nameof(plan));
            }

            using var context = new AccountingContext();

            if (plan.Id != Guid.Empty && await context.Plans.AnyAsync(item => item.Id == plan.Id))
            {
                Plan stored = await context.Plans.
                    Include(x => x.Savings).
                    Include(x => x.Spendings).
                    FirstAsync(item => item.Id == plan.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(plan);

                // удаление накоплений
                List<PlanSaving> removedSavings = stored.Savings.
                    Where(storeSaving => plan.Savings.All(saving => saving.Id != storeSaving.Id)).ToList();

                if (removedSavings.Any())
                {
                    context.RemoveRange(removedSavings);
                }

                // удаление трат
                List<PlanSpending> removedSpendings = stored.Spendings.
                    Where(storeSpendings => plan.Spendings.All(spending => spending.Id != storeSpendings.Id)).ToList();

                if (removedSpendings.Any())
                {
                    context.RemoveRange(removedSpendings);
                }

                // добавление/изменение накоплений
                if (plan.Savings.Any())
                {
                    await SetSavings(plan.Savings, context);
                }

                // добавление/цдаление трат
                if (plan.Spendings.Any())
                {
                    await SetSpendings(plan.Spendings, context);
                }

                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (plan.Id == Guid.Empty)
                {
                    plan.Id = Guid.NewGuid();
                }

                //создание записи
                Plan stored = (await context.AddAsync(plan)).Entity;

                await context.SaveChangesAsync();

                return stored;
            }
        }

        /// <summary>
        /// Обновление/добавление трат
        /// </summary>
        /// <param name="spendings">Траты</param>
        /// <param name="context">Контекст данных</param>
        /// <returns></returns>
        private static async Task SetSpendings(ICollection<PlanSpending> spendings, AccountingContext context)
        {
            // обновление/добавление трат
            foreach (PlanSpending spending in spendings)
            {
                PlanSpending? storedSpending = await context.PlanSpendings.FirstOrDefaultAsync(stored => stored.Id == spending.Id);

                if (storedSpending is null)
                {
                    await context.PlanSpendings.AddAsync(spending);
                }
                else
                {
                    context.Entry(storedSpending).CurrentValues.SetValues(spending);
                }
            }
        }

        /// <summary>
        /// Обновление/добавление накоплений
        /// </summary>
        /// <param name="savings">Накопления</param>
        /// <param name="context">Контекст данных</param>
        /// <returns></returns>
        private static async Task SetSavings(ICollection<PlanSaving> savings, AccountingContext context)
        {
            foreach (PlanSaving saving in savings)
            {
                PlanSaving? storedSavings = await context.PlanSavings.FirstOrDefaultAsync(stored => stored.Id == saving.Id);

                if (storedSavings is null)
                {
                    await context.PlanSavings.AddAsync(saving);
                }
                else
                {
                    context.Entry(storedSavings).CurrentValues.SetValues(saving);
                }
            }
        }

        public async Task<Plan> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            Plan? stored = await context.Plans
                .Include(x => x.Savings)
                .Include(x => x.Spendings)
                .FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                if (stored.Savings.Any())
                {
                    context.PlanSavings.RemoveRange(stored.Savings);
                }

                if (stored.Spendings.Any())
                {
                    context.PlanSpendings.RemoveRange(stored.Spendings);
                }

                context.Plans.Remove(stored);
                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}
