using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Базовый класс элементов модели данных
    /// </summary>
    public abstract class ModelElementBaseDTO
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        public Guid Id { get; set; }
    }
}
