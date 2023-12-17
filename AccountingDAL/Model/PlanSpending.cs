using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Планируемые траты
    /// </summary>
    public class PlanSpending : ModelElementBase
    {
        /// <summary>
        /// Идентификатор категории
        /// </summary>
        [ForeignKey(nameof(Category))]
        public Guid CategoryID { get; set; } = Guid.Empty;

        /// <summary>
        /// Категория
        /// </summary>
        public Сategory Category { get; set; }

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
        [ForeignKey(nameof(Plan))]
        public Guid PlanID { get; set; }

        /// <summary>
        /// План
        /// </summary>
        public Plan Plan { get; set; }
    }
}
