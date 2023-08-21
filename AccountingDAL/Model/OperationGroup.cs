using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Группа операций
    /// </summary>
    public class OperationGroup : ModelElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Коллекция операций находящихся в данной группе
        /// </summary>
        public ICollection<Operation> Operations { get; set; }

        /// <summary>
        /// Коллекция описаний операций находящихся в данной группе
        /// </summary>
        public ICollection<OperationDescription> OperationDescriptions { get; set; }
    }
}
