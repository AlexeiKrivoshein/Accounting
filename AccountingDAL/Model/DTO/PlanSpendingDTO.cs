using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Планируемые траты
    /// </summary>
    public class PlanSpendingDTO
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Идентификатор категории
        /// </summary>
        public Guid CategoryID { get; set; }

        /// <summary>
        /// Категория
        /// </summary>
        public CategoryDTO Category { get; set; }

        /// <summary>
        /// Планируемая сумма
        /// </summary>
        public float Sum { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Идентификатор плана
        /// </summary>
        public Guid PlanID { get; set; }
    }
}
