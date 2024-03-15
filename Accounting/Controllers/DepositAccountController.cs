using AccountingDAL.Managers;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.DTO.Dictionaries;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/depositAccount")]
    public class DepositAccountController : Controller
    {
        private readonly IMapper _mapper;
        private readonly DepositAccountManager _depositAccountManager;

        public DepositAccountController(IMapper mapper, DepositAccountManager depositAccountManager)
        {
            _mapper = mapper;
            _depositAccountManager = depositAccountManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id.HasValue && id != Guid.Empty)
            {
                DepositAccount depositAccount = await _depositAccountManager.GetAsync(id.Value);
                DepositAccountDTO dto = _mapper.Map<DepositAccountDTO>(depositAccount);

                return Ok(new List<DepositAccountDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<DepositAccount> result = await _depositAccountManager.GetAllAsync();
                List<DepositAccountDTO> dto = _mapper.Map<List<DepositAccountDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] DepositAccountDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'карта'");
            }

            DepositAccount depositAccount = _mapper.Map<DepositAccount>(dto);
            depositAccount = await _depositAccountManager.SetAsync(depositAccount);
            dto = _mapper.Map<DepositAccountDTO>(depositAccount);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            DepositAccount removed = await _depositAccountManager.RemoveAsync(id);
            DepositAccountDTO dto = _mapper.Map<DepositAccountDTO>(removed);

            return Ok(dto);
        }
    }
}
