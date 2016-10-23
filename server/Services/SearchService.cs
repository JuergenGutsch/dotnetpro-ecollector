using System;
using System.Collections.Generic;
using System.Linq;
using server.Data;
using server.Models;
using server.ViewModels.EnterSearch;
using server.ViewModels.Timeline;

namespace server.Services
{
    public class SearchService : ISearchService
    {
        private readonly ApplicationDbContext _dbContext;

        public SearchService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TimelineModel SearchItems(SearchModel search)
        {
            IEnumerable<KnowledgeEntry> items = _dbContext.KnoledgeEntries.ToList();

            if (!string.IsNullOrWhiteSpace(search.SearchTerm))
            {
                items = items.Where(x => x.Content.Contains(search.SearchTerm));
            }

            if (search.FromDate.HasValue && search.FromDate.Value != DateTime.MinValue)
            {
                items = items.Where(x => x.Date >= search.FromDate.Value);
            }
            if (search.ToDate.HasValue && search.ToDate.Value != DateTime.MinValue)
            {
                items = items.Where(x => x.Date <= search.ToDate.Value);
            }

            if (search.Type != SearchType.All.ToString())
            {
                if (search.Type == SearchType.Videos.ToString())
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == DocumentType.Video));
                }
                if (search.Type == SearchType.Audios.ToString())
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == DocumentType.Audio));
                }
                if (search.Type == SearchType.Images.ToString())
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == DocumentType.Image));
                }
                if (search.Type == SearchType.Documents.ToString())
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == DocumentType.Document));
                }
            }

            var count = items.Count();
            var result = items
                  .Skip(search.PageNumber * search.PageSize)
                  .Take(search.PageSize)
                  .Select(x => new TimelineItemModel
                  {
                      Id = x.Id,
                      Content = x.Content,
                      Date = x.Date,
                      User = x.User,
                      Link = ToLinkModel(x.Link),
                      Documents = ToDocumentModels(x.Documents)
                  });

            var model = new TimelineModel
            {
                PageNumber = search.PageNumber,
                PageSize = search.PageSize,
                OverallLength = count,
                Items = result
            };
            return model;
        }

        private IEnumerable<DocumentModel> ToDocumentModels(ICollection<Document> documents)
        {
            if (documents == null || !documents.Any())
            {
                return new List<DocumentModel>();
            }
            return documents.Select(x => new DocumentModel
            {
                Id = x.Id,
                Name = x.Name,
                Source = x.Source,
                Type = x.Type.ToString()
            });
        }

        private LinkModel ToLinkModel(Link link)
        {
            if (link == null)
            {
                return null;
            }
            return new LinkModel
            {
                Id = link.Id,
                Title = link.Title,
                Description = link.Description,
                Url = link.Url
            };
        }
    }
}