using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO.Dictionaries
{
    /// <summary>
    /// Базовый класс элементов-справочников модели данных
    /// при удалении элементы не удаляются из базы а проставляются поля Removed и RemovedDate
    /// </summary>
    public abstract class DictionaryElementBaseDTO : ModelElementBaseDTO
    {
        /// <summary>
        /// Признак удаления
        /// </summary>
        public bool Removed { get; set; } = false;

        /// <summary>
        /// Дата удаления
        /// </summary>
        public DateTime RemovedDate { get; set; } = DateTime.MinValue;
    }
}
