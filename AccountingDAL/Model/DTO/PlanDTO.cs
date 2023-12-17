using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// План
    /// </summary>
    public class PlanDTO : ModelElementBaseDTO
    {
        /// <summary>
        /// Имя
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Дата начала плана
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Дата окончания плана
        /// </summary>
        public DateTime EndDate { get; set; }

        /// <summary>
        /// Траты
        /// </summary>
        public List<PlanSpendingDTO> Spendings { get; set; } = new List<PlanSpendingDTO>();

        /// <summary>
        /// Накопления
        /// </summary>
        public List<PlanSavingDTO> Savings { get; set; } = new List<PlanSavingDTO>();

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }
    }
}
