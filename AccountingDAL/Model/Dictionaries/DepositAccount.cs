using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.Dictionaries
{
    /// <summary>
    /// Депозитный счет
    /// </summary>
    public class DepositAccount: AccountBase
    {
        /// <summary>
        /// Идентификатор категории
        /// </summary>
        [ForeignKey(nameof(Category))]
        public Guid? CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public Category? Category { get; set; }
    }
}
