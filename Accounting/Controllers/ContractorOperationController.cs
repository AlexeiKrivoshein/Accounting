using Accounting.Constant;
using AccountingDAL.Managers;
using AccountingDAL.Model.DTO.Operation;
using AccountingDAL.Model.Operations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

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
            Dictionary<string, string> filters = HttpContext.Request.Query.Where(x => x.Key.StartsWith(Constants.FILTER_PREFIX)).ToDictionary(x => x.Key.Substring(2), x => x.Value.ToString());

            if (id is not null && id != Guid.Empty)
            {
                ContractorOperation operation = await _operationManager.GetAsync(id.Value);
                ContractorOperationDTO dto = _mapper.Map<ContractorOperationDTO>(operation);

                return Ok(new List<ContractorOperationDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<ContractorOperation> result = await _operationManager.GetAllAsync(filters);
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
