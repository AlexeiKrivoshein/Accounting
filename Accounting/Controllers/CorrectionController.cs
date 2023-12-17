using AccountingDAL.Managers;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/correction")]
    public class CorrectionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly CorrectionManager _correctionManager;

        public CorrectionController(IMapper mapper, CorrectionManager operationManager)
        {
            _mapper = mapper;
            _correctionManager = operationManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Correction correction = await _correctionManager.GetAsync(id.Value);
                CorrectionDTO dto = _mapper.Map<CorrectionDTO>(correction);

                return Ok(new List<CorrectionDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Correction> result = await _correctionManager.GetAllAsync();
                List<CorrectionDTO> dto = _mapper.Map<List<CorrectionDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] CorrectionDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'коррекция'");
            }

            Correction correction = _mapper.Map<Correction>(dto);
            correction = await _correctionManager.SetAsync(correction);
            dto = _mapper.Map<CorrectionDTO>(correction);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Correction removed = await _correctionManager.RemoveAsync(id);
            CorrectionDTO dto = _mapper.Map<CorrectionDTO>(removed);

            return Ok(dto);
        }
    }
}
