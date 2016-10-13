using System.Threading.Tasks;
using server.ViewModels.Timeline;

namespace server.Services
{
    public interface IKnoledgeService
    {
        TimelineModel LoadKnoledgeTimeline(int page, int pageSize);
        void AddKnoledgeItem(AddKnoledgeItemModel model);
    }
}