using AccountingDAL.Model.Dictionaries;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountingDAL.Model.Operations
{
    /// <summary>
    /// Операции с наличными
    /// </summary>
    public class CashOperation : Operation
    {
        /// <summary>
        /// Идентификатор счета
        /// </summary>
        [ForeignKey(nameof(Account))]
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет
        /// </summary>
        public Account Account { get; set; }

        /// <summary>
        /// Тип операции дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
