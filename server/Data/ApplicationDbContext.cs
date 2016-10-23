using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<KnowledgeEntry>()
                .HasOne(x => x.Link)
                .WithOne(x => x.KnowledgeEntry)
                .HasForeignKey<Link>(x => x.KnoledgeEntryId);
            builder.Entity<KnowledgeEntry>()
                .HasMany(x => x.Documents)
                .WithOne(x => x.KnowledgeEntry)
                .HasForeignKey(x => x.KnoledgeEntryId);

            builder.Entity<KnowledgeEntry>()
                .ToTable("KnoledgeEntries")
                .HasKey("Id");
            builder.Entity<Document>()
                .ToTable("Documents")
                .HasKey("Id");

            builder.Entity<Link>()
                .ToTable("Links")
                .HasKey("Id");
        }

        public DbSet<KnowledgeEntry> KnoledgeEntries { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Document> Documents { get; set; }
    }
}
