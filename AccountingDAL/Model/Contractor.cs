using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Контрагент
    /// </summary>
    public class Contractor : ModelElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Идентификатор категории
        /// </summary>
        [ForeignKey(nameof(Category))]
        public Guid CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public Сategory Category { get; set; }

        /// <summary>
        /// Основной тип операций для данного контрагента дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
