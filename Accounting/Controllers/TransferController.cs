using AccountingDAL.Managers;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/transfer")]
    public class TransferController : Controller
    {
        private readonly IMapper _mapper;
        private readonly TransferManager _operationManager;

        public TransferController(IMapper mapper, TransferManager operationManager)
        {
            _mapper = mapper;
            _operationManager = operationManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Transfer operation = await _operationManager.GetAsync(id.Value);
                TransferDTO dto = _mapper.Map<TransferDTO>(operation);

                return Ok(new List<TransferDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Transfer> result = await _operationManager.GetAllAsync();
                List<TransferDTO> dto = _mapper.Map<List<TransferDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] TransferDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Не корректная сущность 'операция'");
            }

            Transfer operation = _mapper.Map<Transfer>(dto);
            operation = await _operationManager.SetAsync(operation);
            dto = _mapper.Map<TransferDTO>(operation);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Transfer removed = await _operationManager.RemoveAsync(id);
            TransferDTO dto = _mapper.Map<TransferDTO>(removed);

            return Ok(dto);
        }
    }
}