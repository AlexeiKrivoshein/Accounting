using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Операция перевода между счетами
    /// </summary>
    public class TransferDTO : MovementDTO
    {
        /// <summary>
        /// Идентификатор счета кредита
        /// </summary>
        public Guid CreditAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public AccountDTO CreditAccount { get; set; }

        /// <summary>
        /// Идентификатор счета дебета
        /// </summary>
        public Guid DebitAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет дебета
        /// </summary>
        public AccountDTO DebitAccount { get; set; }
    }
}
