using AccountingDAL.Managers;
using AccountingDAL.Model.DTO.Operations;
using AccountingDAL.Model.Operations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/cashOperation")]
    public class CashOperationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly CashOperationManager _cashOperationManager;

        public CashOperationController(IMapper mapper, CashOperationManager cashOperationManager)
        {
            _mapper = mapper;
            _cashOperationManager = cashOperationManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                CashOperation cash = await _cashOperationManager.GetAsync(id.Value);
                CashOperationDTO dto = _mapper.Map<CashOperationDTO>(cash);

                return Ok(new List<CashOperationDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<CashOperation> result = await _cashOperationManager.GetAllAsync();
                List<CashOperationDTO> dto = _mapper.Map<List<CashOperationDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] CashOperationDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'операция с наличными'");
            }

            CashOperation cash = _mapper.Map<CashOperation>(dto);
            cash = await _cashOperationManager.SetAsync(cash);
            dto = _mapper.Map<CashOperationDTO>(cash);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаляемой записи");
            }

            CashOperation removed = await _cashOperationManager.RemoveAsync(id);
            CashOperationDTO dto = _mapper.Map<CashOperationDTO>(removed);

            return Ok(dto);
        }
    }
}
