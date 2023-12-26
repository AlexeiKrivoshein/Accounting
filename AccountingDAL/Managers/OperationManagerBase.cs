using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public abstract class OperationManagerBase
    {
        public async Task<int> GetNextIndexAsync(DateTime date)
        {
            using var context = new AccountingContext();

            int index = -1;

            List<int>? indexes = await context.ContractorOperations.Where(x =>
                x.Date.Year == date.Year &&
                x.Date.Month == date.Month &&
                x.Date.Day == date.Day)
                .Select(x => x.Index).ToListAsync();

            if (indexes is not null && indexes.Any())
            {
                index = indexes.Max();
            }

            indexes = await context.TransferOperations.Where(x =>
                x.Date.Year == date.Year &&
                x.Date.Month == date.Month &&
                x.Date.Day == date.Day)
                .Select(x => x.Index).ToListAsync();

            if (indexes is not null && indexes.Any())
            {
                index = Math.Max(indexes.Max(), index);
            }

            indexes = await context.CorrectionOperations.Where(x =>
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
