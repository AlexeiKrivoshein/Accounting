using AccountingDAL.Managers;
using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/balance")]
    public class BalanceController : Controller
    {
        private readonly IMapper _mapper;
        private readonly BalanceManager _balanceManager;

        public BalanceController(IMapper mapper, BalanceManager balanceManager)
        {
            _mapper = mapper;
            _balanceManager = balanceManager;
        }

        [HttpGet("calculate")]
        public async Task Calculate([FromQuery] DateTime date)
        {
            await _balanceManager.CalculateAsync(date);
        }

        [HttpGet("check")]
        public async Task Check()
        {
            await _balanceManager.CalculateAndStoreBalancesAsync();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetOperationBalance([FromQuery] Guid id)
        {
            List<Balance> balances = await _balanceManager.GetMovementBalanceAsync(id);
            List<BalanceDTO> dto = _mapper.Map<List<BalanceDTO>>(balances);

            return Ok(dto);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            IReadOnlyCollection<Balance> result = await _balanceManager.GetAllAsync();
            List<BalanceDTO> dto = _mapper.Map<List<BalanceDTO>>(result);

            return Ok(dto);
        }
    }
}
