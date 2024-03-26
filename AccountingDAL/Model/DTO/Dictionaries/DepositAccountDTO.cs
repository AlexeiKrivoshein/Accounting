using AccountingDAL.Model.Dictionaries;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO.Dictionaries
{
    /// <summary>
    /// Депозитный счет
    /// </summary>
    public class DepositAccountDTO: AccountBaseDTO
    {
        /// <summary>
        /// Идентификатор категории
        /// </summary>
        public Guid? CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public CategoryDTO? Category { get; set; }
    }
}
