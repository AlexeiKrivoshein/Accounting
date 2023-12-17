using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Счет
    /// </summary>
    public class Account : DictionaryElementBase
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
        public ICollection<Transfer> CreditTransfers { get; set; }

        /// <summary>
        /// Коллекция перводов-дкбктов данного счета
        /// </summary>
        public ICollection<Transfer> DeditTransfers { get; set; }
    }
}
