namespace AccountingDAL.Model.Dictionaries
{
    /// <summary>
    /// Базовый класс элементов-справочников модели данных
    /// при удалении элементы не удаляются из базы а проставляются поля Removed и RemovedDate
    /// </summary>
    public abstract class DictionaryElementBase : ModelElementBase
    {
        /// <summary>
        /// Признак удаления
        /// </summary>
        public bool Removed { get; set; } = false;

        /// <summary>
        /// Дата удаления
        /// </summary>
        public DateTime RemovedDate { get; set; } = DateTime.MinValue;
    }
}
