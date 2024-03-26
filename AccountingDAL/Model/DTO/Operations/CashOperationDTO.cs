using AccountingDAL.Model.DTO.Dictionaries;
using AccountingDAL.Model.DTO.Operation;
using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.DTO.Operations
{
    /// <summary>
    /// Операции с наличными
    /// </summary>

    public class CashOperationDTO : OperationDTO
    {
        /// <summary>
        /// Идентификатор счета
        /// </summary>
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет
        /// </summary>
        public AccountBaseDTO Account { get; set; }

        /// <summary>
        /// Тип операции дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
