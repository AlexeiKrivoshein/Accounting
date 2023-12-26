namespace AccountingDAL.Model.Operations
{
    /// <summary>
    /// Движения по счетам
    /// </summary>
    public class Operation : ModelElementBase
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
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Порядковый номер операции в разрезе дня
        /// </summary>
        public int Index { get; set; }
    }
}
