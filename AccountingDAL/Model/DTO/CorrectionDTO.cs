﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model.DTO
{
    /// <summary>
    /// Коррекция остатков по счету
    /// </summary>
    public class CorrectionDTO : MovementDTO
    {
        /// <summary>
        /// Идентификатор счета
        /// </summary>
        public Guid AccountID { get; set; } = Guid.Empty;

        /// <summary>
        /// Счет
        /// </summary>
        public Account Account { get; set; }

        /// <summary>
        /// Тип операции дебет/кредит
        /// </summary>
        public OperationType OperationType { get; set; }
    }
}
