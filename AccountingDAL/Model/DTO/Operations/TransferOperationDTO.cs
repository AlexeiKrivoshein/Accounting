using AccountingDAL.Model.DTO.Dictionaries;

namespace AccountingDAL.Model.DTO.Operation
{
    /// <summary>
    /// Операция перевода между счетами
    /// </summary>
    public class TransferOperationDTO : OperationDTO
    {
        /// <summary>
        /// Идентификатор счета кредита
        /// </summary>
        public Guid CreditAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public AccountDTO CreditAccount { get; set; }

        /// <summary>
        /// Идентификатор счета дебета
        /// </summary>
        public Guid DebitAccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет дебета
        /// </summary>
        public AccountDTO DebitAccount { get; set; }
    }
}
