using System.Threading.Tasks;
using server.ViewModels.Timeline;

namespace server.Services
{
    public interface IKnowledgeService
    {
        TimelineModel LoadKnowledgeTimeline(int page, int pageSize);
        void AddKnowledgeItem(AddKnoledgeItemModel model);
    }
}