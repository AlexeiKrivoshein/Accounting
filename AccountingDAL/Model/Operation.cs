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
    public class Operation
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
        /// Идентификатор счета дебета
        /// </summary>
        [ForeignKey(nameof(DebitAccount))]
        public string DebitAccountID { get; set; } = string.Empty;

        /// <summary>
        /// Счет дебет
        /// </summary>
        public Account? DebitAccount { get; set; }

        /// <summary>
        /// Идентификатор счета кредита
        /// </summary>
        [ForeignKey(nameof(CreditAccount))]
        public string CreditAccountID { get; set; } = string.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public Account? CreditAccount { get; set; }

        /// <summary>
        /// Идентификатор группы операции
        /// </summary>
        [ForeignKey(nameof(OperationGroup))]
        public string OperationGroupID { get; set; } = string.Empty;

        /// <summary>
        /// Группа операции
        /// </summary>
        public OperationGroup? OperationGroup { get; set; }
    }
}
