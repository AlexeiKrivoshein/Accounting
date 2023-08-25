using AccountingDAL.Managers;
using AccountingDAL.Model.DTO;
using AccountingDAL.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/template")]
    public class TemplateController : Controller
    {
        private readonly IMapper _mapper;
        private readonly TemplateManager _templateManager;

        public TemplateController(IMapper mapper, TemplateManager templateManager)
        {
            _mapper = mapper;
            _templateManager = templateManager;
        }


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Template template = await _templateManager.GetAsync(id.Value);
                TemplateDTO dto = _mapper.Map<TemplateDTO>(template);

                return Ok(new List<TemplateDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Template> result = await _templateManager.GetAllAsync();
                List<TemplateDTO> dto = _mapper.Map<List<TemplateDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] TemplateDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Не корректная сущность 'шаблон'");
            }

            Template template = _mapper.Map<Template>(dto);
            template = await _templateManager.SetAsync(template);
            dto = _mapper.Map<TemplateDTO>(template);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Template removed = await _templateManager.RemoveAsync(id);
            TemplateDTO dto = _mapper.Map<TemplateDTO>(removed);

            return Ok(dto);
        }
    }
}
