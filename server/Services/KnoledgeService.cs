using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.Models;
using server.ViewModels.Timeline;

namespace server.Services
{
    public class KnoledgeService : IKnoledgeService
    {
        private readonly ApplicationDbContext _dbContext;

        public KnoledgeService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TimelineModel LoadKnoledgeTimeline(int page, int pageSize)
        {
            var items = _dbContext.KnoledgeEntries
                .OrderByDescending(x => x.Date)
                .Select(x => new TimelineItemModel
                {
                    Id = x.Id,
                    Content = x.Content,
                    Date = x.Date,
                    User = x.User,
                    Link = ToLinkModel(x.Link),
                    Documents = ToDocumentModels(x.Documents)
                });

            var count = items.Count();
            items = items
                .Skip(page * pageSize)
                .Take(pageSize);

            var model = new TimelineModel
            {
                PageNumber = page,
                PageSize = pageSize,
                Items = items,
                OverallLength = count
            };
            return model;
        }

        public void AddKnoledgeItem(AddKnoledgeItemModel model)
        {
            var entry = new KnoledgeEntry
            {
                Content = model.Content,
                Date = DateTime.Now,
                User = "Juergen",
                Link = ToLink(model.Link),
                Documents = ToDocuments(model.Documents)
            };

            _dbContext.KnoledgeEntries.Add(entry);
        }

        private ICollection<Document> ToDocuments(IEnumerable<DocumentModel> models)
        {
            if (models == null || !models.Any())
            {
                return null;
            }
            return models.Select(model => new Document
            {
                Name = model.Name,
                Source = model.Source,
                Type = (DocumentType)Enum.Parse(typeof(DocumentType), model.Type)
            }).ToList();
        }

        private Link ToLink(LinkModel model)
        {
            if (model == null)
            {
                return null;
            }
            return new Link
            {
                Title = model.Title,
                Description = model.Description,
                Url = model.Url
            };
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