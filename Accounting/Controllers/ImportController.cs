using AccountingDAL.Managers;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.Controllers
{
    [Route("api/import")]
    public class ImportController : Controller
    {
        private readonly ImportManager _importManager;

        public ImportController(ImportManager importManager)
        {
            _importManager = importManager;
        }

        [HttpPost(nameof(Parse))]
        public async Task<IActionResult> Parse([FromBody] string content)
        {
            return Ok(await _importManager.Parse(content));
        }
    }
}
