using AccountingDAL.Managers;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IMapper _mapper;
        private readonly AccountManager _accountManager;

        public AccountController(IMapper mapper, AccountManager accountManager)
        {
            _mapper = mapper;
            _accountManager = accountManager;
        }


        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id.HasValue && id != Guid.Empty)
            {
                Account account = await _accountManager.GetAsync(id.Value);
                AccountDTO dto = _mapper.Map<AccountDTO>(account);

                return Ok(new List<AccountDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Account> result = await _accountManager.GetAllAsync();
                List<AccountDTO> dto = _mapper.Map<List<AccountDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost("set")]
        public async Task<IActionResult> Set([FromBody] AccountDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Не корректная сущность 'операция'");
            }

            Account account = _mapper.Map<Account>(dto);
            account = await _accountManager.SetAsync(account);
            dto = _mapper.Map<AccountDTO>(account);

            return Ok(dto);
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Account removed = await _accountManager.RemoveAsync(id);
            AccountDTO dto = _mapper.Map<AccountDTO>(removed);

            return Ok(dto);
        }
    }
}
