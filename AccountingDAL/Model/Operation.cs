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
        /// Счет дебет
        /// </summary>
        public Account? DebitAccount { get; set; }

        /// <summary>
        /// Счет кредит
        /// </summary>
        public Account? CreditAccount { get; set; }

        /// <summary>
        /// Группа операции
        /// </summary>
        public OperationGroup? OperationGroup { get; set; }
    }
}
