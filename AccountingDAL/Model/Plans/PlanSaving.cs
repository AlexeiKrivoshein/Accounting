using System.ComponentModel.DataAnnotations.Schema;
using AccountingDAL.Model.Dictionaries;

namespace AccountingDAL.Model.Plans
{
    /// <summary>
    /// Планируемое накопление
    /// </summary>
    public class PlanSaving : ModelElementBase
    {
        /// <summary>
        /// Идентификатор счета
        /// </summary>
        [ForeignKey(nameof(Account))]
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет
        /// </summary>
        public Account Account { get; set; }

        /// <summary>
        /// Сумма
        /// </summary>
        public float Sum { get; set; } = 0F;

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Идентификатор план
        /// </summary>
        [ForeignKey(nameof(Plan))]
        public Guid PlanID { get; set; }

        /// <summary>
        /// План
        /// </summary>
        public Plan Plan { get; set; }
    }
}
