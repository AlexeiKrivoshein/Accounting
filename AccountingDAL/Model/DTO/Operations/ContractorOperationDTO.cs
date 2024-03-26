using AccountingDAL.Model.DTO.Dictionaries;
using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.DTO.Operation
{
    /// <summary>
    /// Операция с контрагентом
    /// </summary>
    public class ContractorOperationDTO : OperationDTO
    {
        /// <summary>
        /// Идентификатор счет
        /// </summary>
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет
        /// </summary>
        public AccountBaseDTO Account { get; set; }

        /// <summary>
        /// Идентификатор контрагента
        /// </summary>
        public Guid ContractorID { get; set; } = Guid.Empty;

        /// <summary>
        /// Контрагент
        /// </summary>
        public ContractorDTO Contractor { get; set; }

        /// <summary>
        /// Идентификатор категории
        /// </summary>
        public Guid CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public CategoryDTO Category { get; set; }

        /// <summary>
        /// Тип операции дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
