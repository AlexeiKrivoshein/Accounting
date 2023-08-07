using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    /// <summary>
    /// Базовый класс элементов модели данных
    /// </summary>
    public abstract class ModelElementBase
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        [Required]
        [MaxLength(36)]
        [Key]
        public Guid Id { get; set; }
    }
}
