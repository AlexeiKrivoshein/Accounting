using System.ComponentModel.DataAnnotations.Schema;
using AccountingDAL.Model.Dictionaries;

namespace AccountingDAL.Model.Operations
{
    /// <summary>
    /// Перевод между счетами
    /// </summary>
    public class TransferOperation : Operation
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
