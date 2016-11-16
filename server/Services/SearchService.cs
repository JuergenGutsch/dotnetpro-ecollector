using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            IEnumerable<KnowledgeEntry> items = _dbContext.KnoledgeEntries
                    .Include(x => x.Documents)
                    .ToList();

            if (!string.IsNullOrWhiteSpace(search.SearchTerm))
            {
                items = items.Where(x => x.Content.ToLower().Contains(search.SearchTerm.ToLower()));
            }

            if (search.DayRange > 0)
            {
                var date = DateTime.Now.AddDays(-search.DayRange);
                items = items.Where(x => x.Date >= date);
            }

            var types = (SearchType)Enum.Parse(typeof(SearchType), search.Types);

            if (types != (types & SearchType.All))
            {
                if (types == (types & SearchType.Videos))
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == (y.Type & DocumentType.Video)));
                }
                if (types == (types & SearchType.Audios))
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == (y.Type & DocumentType.Audio)));
                }
                if (types == (types & SearchType.Images))
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == (y.Type & DocumentType.Image)));
                }
                if (types == (types & SearchType.Documents))
                {
                    items = items.Where(x =>
                        x.Documents.Any(y =>
                            y.Type == (y.Type & DocumentType.Document)));
                }
            }

            var count = items.Count();
            var result = items
                  .OrderByDescending(x => x.Date)
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