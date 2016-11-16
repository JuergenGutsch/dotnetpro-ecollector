using System;
using System.Collections.Generic;

namespace server.Models
{
    public class KnowledgeEntry
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string User { get; set; }
        public DateTime Date { get; set; }
        public Link Link { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}