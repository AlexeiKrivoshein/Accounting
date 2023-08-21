﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Операция
    /// </summary>
    public class Operation : ModelElementBase
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
        /// Идентификатор счета списания
        /// </summary>
        [ForeignKey(nameof(Account))]
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет кредит
        /// </summary>
        public Account Account { get; set; }

        /// <summary>
        /// Идентификатор группы операции
        /// </summary>
        [ForeignKey(nameof(OperationGroup))]
        public Guid OperationGroupID { get; set; } = Guid.Empty;

        /// <summary>
        /// Группа операции
        /// </summary>
        public OperationGroup OperationGroup { get; set; }

        /// <summary>
        /// Идентификатор описания операции
        /// </summary>
        [ForeignKey(nameof(OperationDescription))]
        public Guid OperationDescriptionID { get; set; } = Guid.Empty;

        /// <summary>
        /// Описание операции
        /// </summary>
        public OperationDescription OperationDescription { get; set; }
    }
}
