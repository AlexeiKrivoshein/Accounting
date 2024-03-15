using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO.Dictionaries
{
    /// <summary>
    /// Счет
    /// </summary>
    public abstract class AccountDTO : DictionaryElementBaseDTO
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Код
        /// </summary>
        public string Code { get; set; } = string.Empty;
    }
}
