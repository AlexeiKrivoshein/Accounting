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
        /// Идентификатор депозитного счета кредита
        /// </summary>
        [ForeignKey(nameof(DepositAccount))]
        public Guid? CreditDepositAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Депозитный счет кредит
        /// </summary>
        public DepositAccount? CreditDepositAccount { get; set; }

        /// <summary>
        /// Идентификатор депозитного счета дебета
        /// </summary>
        [ForeignKey(nameof(DepositAccount))]
        public Guid? DebitDepositAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Депозитный счет дебета
        /// </summary>
        public DepositAccount? DebitDepositAccount { get; set; }

        /// <summary>
        /// Идентификатор карты кредита
        /// </summary>
        [ForeignKey(nameof(Card))]
        public Guid? CreditCardID { get; set; } = Guid.Empty;

        /// <summary>
        /// Карта кредита
        /// </summary>
        public Card? CreditCard { get; set; }

        /// <summary>
        /// Идентификатор карты дебета
        /// </summary>
        [ForeignKey(nameof(Card))]
        public Guid? DebitCardID { get; set; } = Guid.Empty;

        /// <summary>
        /// Карта дебета
        /// </summary>
        public Card? DebitCard { get; set; }
    }
}
