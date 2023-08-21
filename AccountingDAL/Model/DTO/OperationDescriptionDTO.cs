using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Описание операции
    /// </summary>
    public class OperationDescriptionDTO: ModelElementBaseDTO
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Идентификатор группы операции по умолчанию
        /// </summary>
        public Guid DefaultOperationGrouptID { get; set; } = Guid.Empty;

        /// <summary>
        /// Группа операции по умолчанию для данного описания
        /// используется для заполнения Operation.OperationGroup
        /// значение которого может быть изменено пользователем
        /// </summary>
        public OperationGroupDTO? DefaultOperationGroup { get; set; }
    }
}
