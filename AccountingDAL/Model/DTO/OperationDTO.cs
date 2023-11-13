using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Операция с контрагентом
    /// </summary>
    public class OperationDTO : ModelElementBaseDTO
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
        /// Идентификатор счет
        /// </summary>
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public AccountDTO Account { get; set; }

        /// <summary>
        /// Идентификатор категории
        /// </summary>
        public Guid CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public CategoryDTO Category { get; set; }

        /// <summary>
        /// Идентификатор контрагента
        /// </summary>
        public Guid ContractorID { get; set; } = Guid.Empty;

        /// <summary>
        /// Контрагент
        /// </summary>
        public СontractorDTO Contractor { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Тип операции дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }

        /// <summary>
        /// Порядковый номер операции в разрезе дня
        /// </summary>
        public int Index { get; set; }
    }
}
