using AccountingDAL.Managers;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.DTO.Dictionaries;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/contractor")]
    public class ContractorController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ContractorManager _contractorManager;

        public ContractorController(IMapper mapper, ContractorManager contractorManager)
        {
            _mapper = mapper;
            _contractorManager = contractorManager;
        }


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Contractor contractor = await _contractorManager.GetAsync(id.Value);
                ContractorDTO dto = _mapper.Map<ContractorDTO>(contractor);

                return Ok(new List<ContractorDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Contractor> result = await _contractorManager.GetAllAsync();
                List<ContractorDTO> dto = _mapper.Map<List<ContractorDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] ContractorDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'контрагент'");
            }

            Contractor contractor = _mapper.Map<Contractor>(dto);
            contractor = await _contractorManager.SetAsync(contractor);
            dto = _mapper.Map<ContractorDTO>(contractor);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Contractor removed = await _contractorManager.RemoveAsync(id);
            ContractorDTO dto = _mapper.Map<ContractorDTO>(removed);

            return Ok(dto);
        }
    }
}
