﻿using AccountingDAL.Managers;
using AccountingDAL.Model;
using AccountingDAL.Model.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/operationGroup")]
    public class OperationGroupController : Controller
    {
        private readonly IMapper _mapper;
        private readonly OperationGroupManager _operationGroupManager;

        public OperationGroupController(IMapper mapper, OperationGroupManager operationGroupManager)
        {
            _mapper = mapper;
            _operationGroupManager = operationGroupManager;
        }


        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] Guid? id)
        {
            if (id is not null && id != Guid.Empty)
            {
                OperationGroup operationGroup = await _operationGroupManager.GetAsync(id.Value);
                return Ok(new List<OperationGroup> { operationGroup });
            }
            else
            {
                IReadOnlyCollection<OperationGroup> result = await _operationGroupManager.GetAllAsync();
                return Ok(result);
            }
        }

        [HttpPost("set")]
        public async Task<IActionResult> Set([FromBody] OperationGroupDTO dto)
        {
            if(dto is null)
            {
                throw new ArgumentNullException("Не корректная сущность 'операция'");
            }

            OperationGroup operationGroup = _mapper.Map<OperationGroup>(dto);
            operationGroup = await _operationGroupManager.SetAsync(operationGroup);

            return Ok(operationGroup);
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> Remove([FromQuery] Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException("Передан пустой ключ удаялемой записи");
            }

            OperationGroup removed = await _operationGroupManager.RemoveAsync(id);

            return Ok(removed);
        }
    }
}
