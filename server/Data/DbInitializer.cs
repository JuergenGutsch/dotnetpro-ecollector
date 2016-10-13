using System.Linq;
using System.Security.Cryptography.X509Certificates;
using GenFu;
using GenFu.ValueGenerators.Lorem;
using server.Models;

namespace server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext dbContext)
        {
            dbContext.Database.EnsureCreated();

            // Look for any students.
            if (dbContext.KnoledgeEntries.Any())
            {
                return;   // DB has been seeded
            }

            GenFu.GenFu.Configure<Document>()
                .Fill(x => x.Id, 0)
                .Fill(x => x.Type).WithRandom(new[]
                {
                    DocumentType.Audio,
                    DocumentType.Video,
                    DocumentType.Image,
                    DocumentType.Document
                });

            GenFu.GenFu.Configure<Link>()
                .Fill(x => x.Id, 0);

            GenFu.GenFu.Configure<KnoledgeEntry>()
                .Fill(x => x.Id, 0)
                .Fill(x => x.Content, () => Lorem.GenerateSentences(GenFu.GenFu.Random.Next(1, 6)))
                .Fill(x => x.Link, () => null)
                .Fill(x => x.Documents, () => null);

            var entries = A.ListOf<KnoledgeEntry>(300);
            foreach (var entry in entries)
            {
                dbContext.KnoledgeEntries.Add(entry);
                dbContext.SaveChanges();

                var link = A.New<Link>();
                link.KnoledgeEntryId = entry.Id;
                dbContext.Links.Add(link);
                dbContext.SaveChanges();

                var documents = A.ListOf<Document>(GenFu.GenFu.Random.Next(0, 10));
                dbContext.Documents.AddRange(documents.Select(x =>
                {
                    x.KnoledgeEntryId = entry.Id;
                    return x;
                }));
                dbContext.SaveChanges();
            }
        }
    }
}
