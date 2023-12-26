namespace AccountingDAL.Model.Plans
{
    /// <summary>
    /// План
    /// </summary>
    public class Plan : ModelElementBase
    {
        /// <summary>
        /// Имя
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Дата начала плана
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Дата окончания плана
        /// </summary>
        public DateTime EndDate { get; set; }

        /// <summary>
        /// Траты
        /// </summary>
        public ICollection<PlanSpending> Spendings { get; set; } = new List<PlanSpending>();

        /// <summary>
        /// Накопления
        /// </summary>
        public ICollection<PlanSaving> Savings { get; set; } = new List<PlanSaving>();

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }
    }
}
