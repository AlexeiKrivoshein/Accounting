using AccountingDAL.Managers;
using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/operation")]
    public class OperationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly OperationManager _operationManager;

        public OperationController(IMapper mapper, OperationManager operationManager)
        {
            _mapper = mapper;
            _operationManager = operationManager;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Operation operation = await _operationManager.GetAsync(id.Value);
                OperationDTO dto = _mapper.Map<OperationDTO>(operation);

                return Ok(new List<OperationDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Operation> result = await _operationManager.GetAllAsync();
                List<OperationDTO> dto = _mapper.Map<List<OperationDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost("set")]
        public async Task<IActionResult> Set([FromBody] OperationDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Не корректная сущность 'операция'");
            }

            Operation operation = _mapper.Map<Operation>(dto);
            operation = await _operationManager.SetAsync(operation);
            dto = _mapper.Map<OperationDTO>(operation);

            return Ok(dto);
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Operation removed = await _operationManager.RemoveAsync(id);
            OperationDTO dto = _mapper.Map<OperationDTO>(removed);

            return Ok(dto);
        }
    }
}
