using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Описание операции
    /// </summary>
    public class OperationDescription : ModelElementBase
    {
        /// <summary>
        /// Наименование
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Группа операции по умолчанию для данного описания
        /// используется для заполнения Operation.OperationGroup
        /// значение которого может быть изменено пользователем
        /// </summary>
        public OperationGroup? DefaultOperationGroup { get; set; }
    }
}
