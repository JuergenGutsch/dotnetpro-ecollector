using System;

namespace server.ViewModels.EnterSearch
{
    public class SearchModel
    {
        public string SearchTerm { get; set; }
        public string Types { get; set; }
        public int DayRange { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    [Flags]
    public enum SearchType
    {
        All,
        Videos,
        Audios,
        Documents,
        Images
    }
}
