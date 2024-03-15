using AccountingDAL.Model.Operations;

namespace AccountingDAL.Model.Dictionaries
{
    /// <summary>
    /// Категория
    /// </summary>
    public class Category : DictionaryElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Коллекция операций находящихся в данной категории
        /// </summary>
        public ICollection<ContractorOperation> Operations { get; set; }

        /// <summary>
        /// Коллекция контрагентов находящихся в данной категории
        /// </summary>
        public ICollection<Contractor> Contractors { get; set; }

        /// <summary>
        /// Коллекция депоситных счетов находящихся в данной категории
        /// </summary>
        public ICollection<DepositAccount> DepositAccounts { get; set; }
    }
}
