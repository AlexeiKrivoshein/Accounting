using AccountingDAL.Managers;
using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/plan")]
    public class PlanController : Controller
    {
        private readonly IMapper _mapper;
        private readonly PlanManager _planManager;

        public PlanController(IMapper mapper, PlanManager planManager)
        {
            _mapper = mapper;
            _planManager = planManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Plan plan = await _planManager.GetAsync(id.Value);
                PlanDTO dto = _mapper.Map<PlanDTO>(plan);

                return Ok(new List<PlanDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Plan> result = await _planManager.GetAllAsync();
                List<PlanDTO> dto = _mapper.Map<List<PlanDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] PlanDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'план'");
            }

            Plan plan = _mapper.Map<Plan>(dto);
            plan = await _planManager.SetAsync(plan);
            dto = _mapper.Map<PlanDTO>(plan);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Plan removed = await _planManager.RemoveAsync(id);
            PlanDTO dto = _mapper.Map<PlanDTO>(removed);

            return Ok(dto);
        }
    }
}
