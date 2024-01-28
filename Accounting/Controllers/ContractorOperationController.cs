using AccountingDAL.Managers;
using AccountingDAL.Model.DTO.Operation;
using AccountingDAL.Model.Operations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/contractorOperation")]
    public class ContractorOperationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ContractorOperationManager _operationManager;

        public ContractorOperationController(IMapper mapper, ContractorOperationManager operationManager)
        {
            _mapper = mapper;
            _operationManager = operationManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                ContractorOperation operation = await _operationManager.GetAsync(id.Value);
                ContractorOperationDTO dto = _mapper.Map<ContractorOperationDTO>(operation);

                return Ok(new List<ContractorOperationDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<ContractorOperation> result = await _operationManager.GetAllAsync();
                List<ContractorOperationDTO> dto = _mapper.Map<List<ContractorOperationDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] ContractorOperationDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'операция'");
            }

            ContractorOperation operation = _mapper.Map<ContractorOperation>(dto);
            operation = await _operationManager.SetAsync(operation);
            dto = _mapper.Map<ContractorOperationDTO>(operation);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаляемой записи");
            }

            ContractorOperation removed = await _operationManager.RemoveAsync(id);
            ContractorOperationDTO dto = _mapper.Map<ContractorOperationDTO>(removed);

            return Ok(dto);
        }
    }
}
