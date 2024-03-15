using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.Dictionaries
{
    /// <summary>
    /// Счет
    /// </summary>
    public abstract class AccountBase : DictionaryElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Код
        /// </summary>
        public string Code { get; set; } = string.Empty;


        /// <summary>
        /// Коллекция перводов-кредитов данного счета
        /// </summary>
        public ICollection<TransferOperation> CreditTransfers { get; set; }

        /// <summary>
        /// Коллекция перводов-дкбктов данного счета
        /// </summary>
        public ICollection<TransferOperation> DeditTransfers { get; set; }
    }
}
