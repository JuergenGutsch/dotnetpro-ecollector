using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Models;
using server.Services;
using server.ViewModels.Timeline;
using ContentDispositionHeaderValue = Microsoft.Net.Http.Headers.ContentDispositionHeaderValue;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage;
using Microsoft.Extensions.Options;

namespace server.Controllers
{
    [Route("api")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class AddKnowledgeController : Controller
    {
        private readonly IKnowledgeService _knowledgeService;
        private readonly ILogger _logger;
        private readonly IHostingEnvironment _env;
        private readonly AppSettings _settings;

        public AddKnowledgeController(
            IKnowledgeService knowledgeService,
            ILoggerFactory loggerFactory,
            IHostingEnvironment env,
            IOptions<AppSettings> settings)
        {
            _knowledgeService = knowledgeService;
            _logger = loggerFactory.CreateLogger(nameof(AddKnowledgeController));
            _env = env;
            _settings = settings.Value;
        }

        [HttpPut("collect")]
        public async Task<AddResult> AddKnoledge()
        {
            var itemId = Guid.NewGuid();

            var message = Request.Form["message"];

            // get all files from the Form body
            var files = Request.Form.Files.ToList();

            // save to disk
            var filePaths = await SaveFiles(itemId, files);

            // map to DocumentModel
            var documents = ParseFiles(filePaths);

            // parse and map to link
            var link = ParseFirstLink(message);

            var item = new AddKnoledgeItemModel
            {
                Content = message,
                Link = link,
                Documents = documents
            };

            _knowledgeService.AddKnowledgeItem(item);
            return new AddResult("OK");
        }

        private LinkModel ParseFirstLink(string content)
        {
            string youtubePattern = @"^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$";
            var youtubeMatch = Regex.Match(content, youtubePattern);
            if (youtubeMatch.Length >= 1)
            {
                var info = LoadMetaInfosFromYoutube();
                return new LinkModel
                {
                    Url = youtubeMatch.Value,
                    Title = info.Title,
                    Description = info.Description
                };
            }
            return null;
        }

        private WebsiteMetaInfo LoadMetaInfosFromYoutube()
        {
            return new WebsiteMetaInfo
            {
                Title = "Hallo Welt",
                Description = "Das ist die beschreibubng der Website"
            };
        }

        private async Task<IDictionary<string, Uri>> SaveFiles(Guid itemId, ICollection<IFormFile> files)
        {
            _logger.LogInformation($"Files: {files.Count}");
            var result = new Dictionary<string, Uri>();
            foreach (var file in files)
            {
                var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');

                _logger.LogInformation($"FileName: {filename}");

                var credentials = new StorageCredentials(_settings.AzureStorageName, _settings.AzureStorageKey);
                var storageAccount = new CloudStorageAccount(credentials, true);

                var fileClient = storageAccount.CreateCloudFileClient();

                var share = fileClient.GetShareReference(_settings.AzureStorageFileShareName);
                if (await share.CreateIfNotExistsAsync())
                {
                    var directory = share.GetRootDirectoryReference();
                    var fileRef = directory.GetFileReference(filename);
                    if (await fileRef.DeleteIfExistsAsync())
                    {
                        using (var stream = file.OpenReadStream())
                        {
                            await fileRef.UploadFromStreamAsync(stream);
                        }

                        result.Add(filename, fileRef.Uri);
                    }
                }
            }
            return result;
        }

        private static void DeleteExistingFile(string filePath)
        {
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        private string EnsureFolders(Guid itemId)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "data");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            folderPath = Path.Combine(folderPath, "uploads");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            folderPath = Path.Combine(folderPath, itemId.ToString());
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            return folderPath;
        }

        IEnumerable<DocumentModel> ParseFiles(IDictionary<string, Uri> files)
        {
            foreach (var item in files)
            {
                var info = new FileInfo(item.Key);
                var model = new DocumentModel
                {
                    Name = info.Name,
                    Source = item.Value.ToString(),
                    Type = GetTpeByExtension(info.Extension).ToString()
                };
                yield return model;
            }
        }

        DocumentType GetTpeByExtension(string extension)
        {
            switch (extension)
            {
                case "mp3":
                case "wav":
                    return DocumentType.Audio;
                case "mp4":
                case "mov":
                    return DocumentType.Video;
                case "png":
                case "jpg":
                case "gif":
                    return DocumentType.Image;
                default:
                    return DocumentType.Document;
            }
        }

        [HttpGet("timeline")]
        public TimelineModel LoadTimelineItems(
            [FromHeader(Name = "Page-Number")] string rawPageNumber = "1",
            [FromHeader(Name = "Page-Size")] string rawPageSize = "25")
        {
            int pageNumber;
            if (!int.TryParse(rawPageNumber, out pageNumber))
            {
                pageNumber = 1;
            }
            int pageSize;
            if (!int.TryParse(rawPageSize, out pageSize))
            {
                pageSize = 25;
            }

            return _knowledgeService.LoadKnowledgeTimeline(pageNumber, pageSize);
        }
    }

    public class AddKnoledgeViewModel
    {
        public string Text { get; set; }
    }

    public class AddResult
    {
        public AddResult(string message)
        {
            Message = message;
        }

        string Message { get; set; }
    }

    internal class WebsiteMetaInfo
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}