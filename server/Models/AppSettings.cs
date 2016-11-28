using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class AppSettings
    {
        public string CorsAllowedOrigin { get; set; }
        public string AzureStorageName { get; set; }
        public string AzureStorageKey { get; set; }
        public string AzureStorageFileShareName { get; set; }
    }
}
