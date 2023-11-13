using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Перевод между счетами
    /// </summary>
    public class Transfer : Movement
    {
        /// <summary>
        /// Идентификатор счета кредита
        /// </summary>
        [ForeignKey(nameof(Account))]
        public Guid CreditAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public Account CreditAccount { get; set; }

        /// <summary>
        /// Идентификатор счета дебета
        /// </summary>
        [ForeignKey(nameof(Account))]
        public Guid DebitAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет дебета
        /// </summary>
        public Account DebitAccount { get; set; }
    }
}
