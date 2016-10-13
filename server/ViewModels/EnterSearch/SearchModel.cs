using System;

namespace server.ViewModels.EnterSearch
{
    public class SearchModel
    {
        public string SearchTerm { get; set; }
        public string Type { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public enum SearchType
    {
        All,
        Videos,
        Audios,
        Documents,
        Images
    }
}
