using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Операция
    /// </summary>
    public class OperationDTO: ModelElementBaseDTO
    {
        /// <summary>
        /// Дата операции
        /// </summary>
        public DateTime Date { get; set; } = DateTime.Now;

        /// <summary>
        /// Сумма
        /// </summary>
        public float Sum { get; set; } = 0F;

        /// <summary>
        /// Идентификатор счета кредита
        /// </summary>
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public AccountDTO Account { get; set; }

        /// <summary>
        /// Идентификатор группы операции
        /// </summary>
        public Guid OperationGroupID { get; set; } = Guid.Empty;

        /// <summary>
        /// Группа операции
        /// </summary>
        public OperationGroupDTO OperationGroup { get; set; }

        /// <summary>
        /// Идентификатор описания операции
        /// </summary>
        public Guid OperationDescriptionID { get; set; } = Guid.Empty;

        /// <summary>
        /// Описание операции
        /// </summary>
        public OperationDescriptionDTO OperationDescription { get; set; }
    }
}
