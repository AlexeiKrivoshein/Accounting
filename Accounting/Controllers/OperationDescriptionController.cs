using AccountingDAL.Managers;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/operationDescription")]
    public class OperationDescriptionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly OperationDescriptionManager _operationDescriptionManager;

        public OperationDescriptionController(IMapper mapper, OperationDescriptionManager operationDescriptionManager)
        {
            _mapper = mapper;
            _operationDescriptionManager = operationDescriptionManager;
        }


        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                OperationDescription operationDescription = await _operationDescriptionManager.GetAsync(id.Value);
                OperationDescriptionDTO dto = _mapper.Map<OperationDescriptionDTO>(operationDescription);

                return Ok(new List<OperationDescriptionDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<OperationDescription> result = await _operationDescriptionManager.GetAllAsync();
                List<OperationDescriptionDTO> dto = _mapper.Map<List<OperationDescriptionDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost("set")]
        public async Task<IActionResult> Set([FromBody] OperationDescriptionDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Не корректная сущность 'описание операции'");
            }

            OperationDescription operationDescription = _mapper.Map<OperationDescription>(dto);
            operationDescription = await _operationDescriptionManager.SetAsync(operationDescription);
            dto = _mapper.Map<OperationDescriptionDTO>(operationDescription);

            return Ok(dto);
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            OperationDescription removed = await _operationDescriptionManager.RemoveAsync(id);
            OperationDescriptionDTO dto = _mapper.Map<OperationDescriptionDTO>(removed);

            return Ok(dto);
        }
    }
}
