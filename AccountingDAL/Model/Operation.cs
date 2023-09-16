using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Операция
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
        /// Идентификатор счета списания
        /// </summary>
        [ForeignKey(nameof(Account))]
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public Account Account { get; set; }

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
        /// Идентификатор категории
        /// </summary>
        [ForeignKey(nameof(Contractor))]
        public Guid ContractorID { get; set; } = Guid.Empty;

        /// <summary>
        /// Контрагент
        /// </summary>
        public Contractor Contractor { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }
    }
}
