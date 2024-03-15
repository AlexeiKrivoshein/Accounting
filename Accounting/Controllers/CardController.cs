using AccountingDAL.Managers;
using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.DTO.Dictionaries;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/card")]
    public class CardController : Controller
    {
        private readonly IMapper _mapper;
        private readonly CardManager _cardManager;

        public CardController(IMapper mapper, CardManager cardManager)
        {
            _mapper = mapper;
            _cardManager = cardManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id.HasValue && id != Guid.Empty)
            {
                Card card = await _cardManager.GetAsync(id.Value);
                CardDTO dto = _mapper.Map<CardDTO>(card);

                return Ok(new List<CardDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Card> result = await _cardManager.GetAllAsync();
                List<CardDTO> dto = _mapper.Map<List<CardDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] CardDTO dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'карта'");
            }

            Card card = _mapper.Map<Card>(dto);
            card = await _cardManager.SetAsync(card);
            dto = _mapper.Map<CardDTO>(card);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Card removed = await _cardManager.RemoveAsync(id);
            CardDTO dto = _mapper.Map<CardDTO>(removed);

            return Ok(dto);
        }
    }
}
