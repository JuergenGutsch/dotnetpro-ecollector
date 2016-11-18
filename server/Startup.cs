using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using server.Authentication;
using server.Data;
using server.Models;
using server.Services;

namespace server
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
            Env = env;
        }

        public IHostingEnvironment Env { get; set; }
        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<AppSettings>(
                Configuration.GetSection("AppSettings"));
            
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                {
                    if (Env.IsDevelopment())
                    {
                        options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
                    }
                    else
                    {
                        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                    }
                });

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();
            services.AddCors();

            // Add application services.
            services.AddSingleton<IAuthOptionsProvider, AuthOptionsProvider>();
            services.AddScoped<IIdentityResolver, IdentityResolver>();

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddTransient<IKnowledgeService, KnowledgeService>();
            services.AddTransient<ISearchService, SearchService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            ApplicationDbContext dbContext,
            IOptions<AppSettings> settings,
            IAuthOptionsProvider authOptionsProvider)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder => builder
                .WithOrigins(settings.Value.CorsAllowedOrigin)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            // Token Auth Configuration
            app.UseTokenAuthentication(authOptionsProvider);

            app.UseMvc();

            DbInitializer.Initialize(dbContext);
        }
    }
}
