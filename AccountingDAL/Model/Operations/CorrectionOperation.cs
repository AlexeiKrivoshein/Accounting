using System.ComponentModel.DataAnnotations.Schema;
using AccountingDAL.Model.Dictionaries;

namespace AccountingDAL.Model.Operations
{
    /// <summary>
    /// Коррекция остатков по счету
    /// </summary>
    public class CorrectionOperation : Operation
    {
        /// <summary>
        /// Идентификатор депозитного счета
        /// </summary>
        [ForeignKey(nameof(DepositAccount))]
        public Guid? DepositAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Депозитный счет
        /// </summary>
        public DepositAccount? DepositAccount { get; set; }

        /// <summary>
        /// Идентификатор дебетовой карты
        /// </summary>
        [ForeignKey(nameof(Card))]
        public Guid? CardID { get; set; } = Guid.Empty;

        /// <summary>
        /// Дебетовая карта
        /// </summary>
        public Card? Card { get; set; }

        /// <summary>
        /// Тип операции дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
