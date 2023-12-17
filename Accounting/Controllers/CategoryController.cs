﻿using AccountingDAL.Managers;
using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/category")]
    public class CategoryController : Controller
    {
        private readonly IMapper _mapper;
        private readonly CategoryManager _categoryManager;

        public CategoryController(IMapper mapper, CategoryManager categoryManager)
        {
            _mapper = mapper;
            _categoryManager = categoryManager;
        }


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                Сategory category = await _categoryManager.GetAsync(id.Value);
                CategoryDTO dto = _mapper.Map<CategoryDTO>(category);

                return Ok(new List<CategoryDTO> { dto });
            }
            else
            {
                IReadOnlyCollection<Сategory> result = await _categoryManager.GetAllAsync();
                List<CategoryDTO> dto = _mapper.Map<List<CategoryDTO>>(result);

                return Ok(dto);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Set([FromBody] CategoryDTO dto)
        {
            if(dto is null)
            {
                throw new ArgumentNullException("Некорректная сущность 'категория'");
            }

            Сategory category = _mapper.Map<Сategory>(dto);
            category = await _categoryManager.SetAsync(category);
            dto = _mapper.Map<CategoryDTO>(category);

            return Ok(dto);
        }

        [HttpDelete]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            Сategory removed = await _categoryManager.RemoveAsync(id);
            CategoryDTO dto = _mapper.Map<CategoryDTO>(removed);

            return Ok(dto);
        }
    }
}
