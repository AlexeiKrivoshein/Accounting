using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Категория
    /// </summary>
    public class Сategory : ModelElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Коллекция операций находящихся в данной категории
        /// </summary>
        public ICollection<Operation> Operations { get; set; }

        /// <summary>
        /// Коллекция шаблонов находящихся в данной категории
        /// </summary>
        public ICollection<Template> Templates { get; set; }
    }
}
