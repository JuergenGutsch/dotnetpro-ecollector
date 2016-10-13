using System.Threading.Tasks;
using server.ViewModels.EnterSearch;
using server.ViewModels.Timeline;

namespace server.Services
{
    public interface ISearchService
    {
        TimelineModel SearchItems(SearchModel search);
    }
}