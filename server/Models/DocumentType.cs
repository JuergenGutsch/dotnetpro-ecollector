using System;

namespace server.Models
{
    [Flags]
    public enum DocumentType
    {
        Audio,
        Video,
        Image,
        Document
    }
}