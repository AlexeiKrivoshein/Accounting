using AccountingDAL.Managers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using AccountingDAL.Model.DTO.Operation;
using AccountingDAL.Model.Operations;
using Accounting.Constant;

namespace Accounting.Controllers
{
    [Route("api/transferOperation")]
    public class TransferOperationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly TransferOperationManager _transferManager;

        public TransferOperationController(IMapper mapper, TransferOperationManager transferManager)
        {
            _mapper = mapper;
            _transferManager = transferManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            Dictionary<string, string> filters = HttpContext.Request.Query.Where(x => x.Key.StartsWith(Constants.FILTER_PREFIX)).ToDictionary(x => x.Key.Substring(2), x => x.Value.ToString());

            if (id is not null && id != Guid.Empty)
            {
                TransferOperation operation = await _transferManager.GetAsync(id.Value);
                TransferOperationDTO dto = _mapper.Map<TransferOperationDTO>(operation);

                return Ok(new List<TransferOperationDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<TransferOperation> result = await _transferManager.GetAllAsync(filters);
                List<TransferOperationDTO> dto = _mapper.Map<List<TransferOperationDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] TransferOperationDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'перевод'");
            }

            TransferOperation operation = _mapper.Map<TransferOperation>(dto);
            operation = await _transferManager.SetAsync(operation);
            dto = _mapper.Map<TransferOperationDTO>(operation);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            TransferOperation removed = await _transferManager.RemoveAsync(id);
            TransferOperationDTO dto = _mapper.Map<TransferOperationDTO>(removed);

            return Ok(dto);
        }
    }
}