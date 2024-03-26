using AccountingDAL.Model.DTO.Dictionaries;

namespace AccountingDAL.Model.DTO.Plans
{
    /// <summary>
    /// Планируемое накопление
    /// </summary>
    public class PlanSavingDTO
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Идентификатор счета
        /// </summary>
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет
        /// </summary>
        public AccountBaseDTO Account { get; set; }

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
        public Guid PlanID { get; set; }
    }
}
