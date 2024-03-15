﻿using AccountingDAL.Model.Operations;
using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using AccountingDAL.Exceptions;
using Microsoft.EntityFrameworkCore.Query;
using AccountingDAL.Model.Dictionaries;
using System.Linq.Dynamic.Core;

namespace AccountingDAL.Managers
{
    public class CashOperationManager : OperationManagerBase
    {
        public CashOperationManager()
        {
        }

        public async Task<IReadOnlyCollection<CashOperation>> GetAllAsync(Dictionary<string, string> filters)
        {
            using var context = new AccountingContext();
            IIncludableQueryable<CashOperation, AccountBase> select = context.CashOperations
                .Include(x => x.Card);

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

        public async Task<CashOperation> GetAsync(Guid id)
        {
            using var context = new AccountingContext();
            CashOperation? stored = await context.CashOperations
                .Include(item => item.Card)
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

        public async Task<CashOperation> SetAsync(CashOperation cash)
        {
            if (cash is null)
            {
                throw new ArgumentNullException(nameof(cash));
            }

            using var context = new AccountingContext();

            if (cash.Index < 0)
            {
                cash.Index = await GetNextIndexAsync(cash.Date);
            }

            // время ввода операции хранить нет необходимости
            cash.Date = new DateTime(cash.Date.Year, cash.Date.Month, cash.Date.Day, 0, 0, 0);

            if (cash.Id != Guid.Empty && await context.CashOperations.AnyAsync(item => item.Id == cash.Id))
            {
                CashOperation stored = await context.CashOperations.FirstAsync(item => item.Id == cash.Id);

                //обновление записи
                context.Entry(stored).CurrentValues.SetValues(cash);
                await context.SaveChangesAsync();

                return stored;
            }
            else
            {
                if (cash.Id == Guid.Empty)
                {
                    cash.Id = Guid.NewGuid();
                }

                //создание записи
                CashOperation stored = (await context.AddAsync(cash)).Entity;
                await context.SaveChangesAsync();

                return stored;
            }
        }

        public async Task<CashOperation> RemoveAsync(Guid id)
        {
            using var context = new AccountingContext();
            CashOperation? stored = await context.CashOperations.FirstOrDefaultAsync(item => item.Id == id);

            if (stored is null)
            {
                throw new RecordNotFoundException();
            }
            else
            {
                context.CashOperations.Remove(stored);
                await context.SaveChangesAsync();
            }

            return stored;
        }
    }
}
