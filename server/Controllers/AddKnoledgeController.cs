using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using server.Models;
using server.Services;
using server.ViewModels.Timeline;

namespace server.Controllers
{
    [Route("api/addknoledge")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class AddKnoledgeController : Controller
    {
        private readonly IKnoledgeService _knoledgeService;
        private readonly ILogger _logger;
        private readonly IHostingEnvironment _env;

        public AddKnoledgeController(
            IKnoledgeService knoledgeService,
            ILoggerFactory loggerFactory,
            IHostingEnvironment env)
        {
            _knoledgeService = knoledgeService;
            _logger = loggerFactory.CreateLogger(nameof(AddKnoledgeController));
            _env = env;
        }

        [HttpPost]
        public AddResult AddKnoledge(
            [FromBody] AddKnoledgeViewModel model)
        {
            var itemId = Guid.NewGuid();

            // get all files from the Form body
            var files = Request.Form.Files.ToList();

            // save to disk
            var filePaths = SaveFiles(itemId, files);

            // map to DocumentModel
            var documents = ParseFiles(filePaths);

            // parse and map to link
            var link = ParseFirstLink(model.Text);

            var item = new AddKnoledgeItemModel
            {
                Content = model.Text,
                Link = link,
                Documents = documents
            };

            _knoledgeService.AddKnoledgeItem(item);

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

        IEnumerable<string> SaveFiles(Guid itemId, ICollection<IFormFile> files)
        {
            _logger.LogInformation($"Files: {files.Count}");
            foreach (var file in files)
            {
                var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');

                _logger.LogInformation($"FileName: {filename}");

                filename = Path.Combine(_env.WebRootPath, itemId.ToString(), filename);

                using (var fs = System.IO.File.Create(filename))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }

                yield return filename;
            }
        }

        IEnumerable<DocumentModel> ParseFiles(IEnumerable<string> filePaths)
        {
            foreach (var path in filePaths)
            {
                var info = new FileInfo(path);
                var model = new DocumentModel
                {
                    Name = info.Name,
                    Source = path,
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
            };
            int pageSize;
            if (!int.TryParse(rawPageSize, out pageSize))
            {
                pageSize = 25;
            }

            return _knoledgeService.LoadKnoledgeTimeline(pageNumber, pageSize);
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