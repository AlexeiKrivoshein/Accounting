using System.ComponentModel.DataAnnotations.Schema;
using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.Dictionaries
{
    /// <summary>
    /// Контрагент
    /// </summary>
    public class Contractor : DictionaryElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Код
        /// </summary>
        public string Code { get; set; } = string.Empty;

        /// <summary>
        /// Идентификатор категории
        /// </summary>
        [ForeignKey(nameof(Category))]
        public Guid CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public Category Category { get; set; }

        /// <summary>
        /// Основной тип операций для данного контрагента дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
