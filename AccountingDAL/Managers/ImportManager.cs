using AccountingDAL.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Managers
{
    public class ImportManager
    {
        public async Task<List<MovementDTO>> Parse(string content)
        {
            List<MovementDTO> movements = new List<MovementDTO>();

            return movements;
        }
    }
}
