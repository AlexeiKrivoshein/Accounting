using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Шаблон
    /// </summary>
    public class TemplateDTO: ModelElementBaseDTO
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Идентификатор категории по умолчанию
        /// </summary>
        public Guid DefaultCategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория по умолчанию для данного шаблона
        /// используется для заполнения Operation.Category
        /// значение которого может быть изменено пользователем
        /// </summary>
        public CategoryDTO? DefaultCategory { get; set; }
    }
}
