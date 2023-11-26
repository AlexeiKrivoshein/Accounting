using Accounting.DTO;
using AccountingDAL.Managers;
using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/import")]
    public class ImportController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ImportManager _importManager;

        public ImportController(IMapper mapper, ImportManager importManager)
        {
            _mapper = mapper;
            _importManager = importManager;
        }

        [HttpPost(nameof(Parse))]
        public async Task<IActionResult> Parse([FromBody] ImportDTO import)
        {
            if (string.IsNullOrEmpty(import?.content))
            {
                return Ok(new List<MovementDTO>());
            }

            List<Movement> movements = await _importManager.Parse(import.content);

            List<СontractorDTO> dto = _mapper.Map<List<СontractorDTO>>(movements);
            return Ok(dto);
        }
    }
}
