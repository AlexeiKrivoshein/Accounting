using AccountingDAL.Managers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using AccountingDAL.Model.DTO.Operation;
using AccountingDAL.Model.Operations;

namespace Accounting.Controllers
{
    [Route("api/correctionOperation")]
    public class CorrectionOperationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly CorrectionOperationManager _correctionManager;

        public CorrectionOperationController(IMapper mapper, CorrectionOperationManager operationManager)
        {
            _mapper = mapper;
            _correctionManager = operationManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                CorrectionOperation correction = await _correctionManager.GetAsync(id.Value);
                CorrectionOperationDTO dto = _mapper.Map<CorrectionOperationDTO>(correction);

                return Ok(new List<CorrectionOperationDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<CorrectionOperation> result = await _correctionManager.GetAllAsync();
                List<CorrectionOperationDTO> dto = _mapper.Map<List<CorrectionOperationDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] CorrectionOperationDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'коррекция'");
            }

            CorrectionOperation correction = _mapper.Map<CorrectionOperation>(dto);
            correction = await _correctionManager.SetAsync(correction);
            dto = _mapper.Map<CorrectionOperationDTO>(correction);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            CorrectionOperation removed = await _correctionManager.RemoveAsync(id);
            CorrectionOperationDTO dto = _mapper.Map<CorrectionOperationDTO>(removed);

            return Ok(dto);
        }
    }
}
