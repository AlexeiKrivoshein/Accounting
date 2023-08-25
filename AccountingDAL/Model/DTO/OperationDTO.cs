using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Операция
    /// </summary>
    public class OperationDTO: ModelElementBaseDTO
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
        /// Идентификатор счета кредита
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
        /// Идентификатор шаблона
        /// </summary>
        public Guid TemplateID { get; set; } = Guid.Empty;

        /// <summary>
        /// Шаблон
        /// </summary>
        public TemplateDTO Template { get; set; }
    }
}
