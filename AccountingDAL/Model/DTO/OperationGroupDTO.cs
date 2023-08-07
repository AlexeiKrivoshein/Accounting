using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Группа операций
    /// </summary>
    public class OperationGroupDTO: ModelElementBaseDTO
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;
    }
}
