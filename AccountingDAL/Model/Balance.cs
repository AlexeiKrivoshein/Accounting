using System.ComponentModel.DataAnnotations.Schema;
using AccountingDAL.Model.Dictionaries;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Баланс счета на конец дня
    /// </summary>
    public class Balance : ModelElementBase
    {
        /// <summary>
        /// Дата операции
        /// </summary>
        public DateTime Date { get; set; } = DateTime.Now;

        /// <summary>
        /// Сумма
        /// </summary>
        public float Sum { get; set; } = 0F;

        /// <summary>
        /// Идентификатор депозитного счета
        /// </summary>
        [ForeignKey(nameof(DepositAccount))]
        public Guid? DepositAccountId { get; set; } = Guid.Empty;

        /// <summary>
        /// Депозитный счет
        /// </summary>
        public DepositAccount? DepositAccount { get; set; }

        /// <summary>
        /// Идентификатор дебетовой карты
        /// </summary>
        [ForeignKey(nameof(Card))]
        public Guid? CardId { get; set; } = Guid.Empty;

        /// <summary>
        /// Дебетовая карта
        /// </summary>
        public Card? Card { get; set; }
    }
}
