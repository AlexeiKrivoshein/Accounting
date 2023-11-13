using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public abstract class MovementManagerBase
    {
        public async Task<int> GetNextIndexAsync(DateTime date)
        {
            using var context = new AccountingContext();

            int index = -1;

            List<int>? indexes = await context.Operations.Where(x =>
                x.Date.Year == date.Year &&
                x.Date.Month == date.Month &&
                x.Date.Day == date.Day)
                .Select(x => x.Index).ToListAsync();

            if (indexes is not null && indexes.Any())
            {
                index = indexes.Max();
            }

            indexes = await context.Transfers.Where(x =>
                x.Date.Year == date.Year &&
                x.Date.Month == date.Month &&
                x.Date.Day == date.Day)
                .Select(x => x.Index).ToListAsync();

            if (indexes is not null && indexes.Any())
            {
                index = Math.Max(indexes.Max(), index);
            }

            indexes = await context.Corrections.Where(x =>
                x.Date.Year == date.Year &&
                x.Date.Month == date.Month &&
                x.Date.Day == date.Day)
                .Select(x => x.Index).ToListAsync();

            if (indexes is not null && indexes.Any())
            {
                index = Math.Max(indexes.Max(), index);
            }

            return index + 1;
        }
    }
}
