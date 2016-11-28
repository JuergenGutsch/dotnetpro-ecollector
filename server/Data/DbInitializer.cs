using System;
using System.Linq;
using GenFu;
using GenFu.ValueGenerators.Lorem;
using server.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace server.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager)
        {
            dbContext.Database.EnsureCreated();

            // Look for any students.
            if (dbContext.KnoledgeEntries.Any())
            {
                return;   // DB has been seeded
            }

            await CreateUserAsync(dbContext, userManager);

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

            GenFu.GenFu.Configure<KnowledgeEntry>()
                .Fill(x => x.Id, 0)
                .Fill(x => x.Content, () => Lorem.GenerateSentences(GenFu.GenFu.Random.Next(1, 6)))
                .Fill(x => x.Link, () => null)
                .Fill(x => x.Documents, () => null)
                .Fill(x => x.Date, () => new DateTime(
                    GenFu.GenFu.Random.Next(2010, 2016),
                    GenFu.GenFu.Random.Next(1, 12),
                    GenFu.GenFu.Random.Next(1, 29),
                    GenFu.GenFu.Random.Next(0, 23),
                    GenFu.GenFu.Random.Next(0, 59),
                    GenFu.GenFu.Random.Next(0, 59)));


            var entries = A.ListOf<KnowledgeEntry>(300);
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
        public static async Task<IdentityResult> CreateUserAsync(
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager)
        {
            var roleStore = new RoleStore<IdentityRole>(dbContext);
            var roleName = "Administrator";
            var result = await roleStore.CreateAsync(new IdentityRole
            {
                Name = roleName,
                NormalizedName = roleName
            });
            await dbContext.SaveChangesAsync();

            var userFirstName = "Max";
            var userLastName = "Muster";
            var userEmail = "max.muster@domain.com";

            var applicationUser = new ApplicationUser
            {
                UserName = userEmail,
                Email = userEmail,
                FirstName = userFirstName,
                LastName = userLastName
            };

            IdentityResult identityResult;

            var password = "HskPwd2016!";
            identityResult = await userManager.CreateAsync(applicationUser, password);
            await dbContext.SaveChangesAsync();

            if (identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRoleAsync(applicationUser, roleName);

                await userManager.AddClaimAsync(applicationUser, new Claim(ClaimsIdentity.DefaultNameClaimType, userEmail));
                await userManager.AddClaimAsync(applicationUser, new Claim("FirstName", userFirstName));
                await userManager.AddClaimAsync(applicationUser, new Claim("LastName", userLastName));
                await userManager.AddClaimAsync(applicationUser, new Claim(ClaimsIdentity.DefaultRoleClaimType, roleName));

                if (identityResult.Succeeded)
                {
                    var code = await userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                    identityResult = await userManager.ConfirmEmailAsync(applicationUser, code);
                }
            }

            if (!identityResult.Succeeded)
            {
                var errmsg = identityResult.Errors.Aggregate("", (current, err) => current + $"{err.Description}\n");
                return identityResult;
            }

            return identityResult;
        }

    }
}
