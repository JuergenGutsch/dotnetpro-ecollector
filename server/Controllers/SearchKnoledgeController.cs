using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Services;
using server.ViewModels.EnterSearch;
using server.ViewModels.Timeline;

namespace server.Controllers
{
    [Route("api/search")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class SearchKnoledgeController : Controller
    {
        private readonly ISearchService _searchService;
        private readonly IHostingEnvironment _env;
        private readonly ILogger _logger;

        public SearchKnoledgeController(
            ISearchService searchService,
            ILoggerFactory loggerFactory,
            IHostingEnvironment env)
        {
            _searchService = searchService;
            _env = env;
            _logger = loggerFactory.CreateLogger(nameof(SearchKnoledgeController));
        }

        [HttpPost]
        public TimelineModel Search(
            [FromBody] SearchModel model)
        {
            var result = _searchService.SearchItems(model);

            return result;
        }
    }
}