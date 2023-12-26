using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.DTO.Dictionaries
{
    /// <summary>
    /// Шаблон
    /// </summary>
    public class ContractorDTO : DictionaryElementBaseDTO
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
        public Guid CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public CategoryDTO Category { get; set; }

        /// <summary>
        /// Основной тип операций для данного контрагента дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
