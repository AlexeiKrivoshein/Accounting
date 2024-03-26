using AccountingDAL.Model.DTO.Dictionaries;
using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.DTO.Operation
{
    /// <summary>
    /// Коррекция остатков по счету
    /// </summary>
    public class CorrectionOperationDTO : OperationDTO
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
