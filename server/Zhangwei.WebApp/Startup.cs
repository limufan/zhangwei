using Zhangwei;
using Zhangwei.Models.Context;
using Zhangwei.Platform.Filters;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq;

namespace Zhangwei.WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddOptions();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddCors(options =>
            {
                options.AddPolicy("SignalRCors", builder =>
                {
                    builder.SetIsOriginAllowed(origin => true)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            services.AddMvc(opts =>
            {
                opts.EnableEndpointRouting = false;
                opts.Filters.Add<AuthorizationFilter>();
            })
             .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
             .AddNewtonsoftJson(options =>
             {
                 var settings = options.SerializerSettings;
                 settings.Formatting = Formatting.Indented;
                 //HH:mm:ss 按照24小时制的格式进行字符串格式化
                 settings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
                 settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                 settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
             });


            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = 2147483647;
                x.MultipartBodyLengthLimit = 2147483647; //2G
            });

            var connectionString = AppSettings.SqliteConn;
            services.AddDbContextPool<ZhangweiContext>(options =>
            {
                options.UseLoggerFactory(LoggerFactory.Create(builder =>
                {
                    builder
                        .AddFilter((category, level) => level == LogLevel.Error);
                }));
                SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_e_sqlite3());
                options.UseSqlite(connectionString);
            });


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            }).AddCookie("Cookies", options =>
            {


            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors("any");
            app.UseAuthentication();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Node}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "downRoute",
                    template: "{controller=Node}/{action=Index}/{name}.gz");
                routes.MapRoute(
                    name: "areaRoute",
                    template: "{area:exists}/{controller=Auth}/{action=Index}/{id?}");
            });


            app.UseSpa(spa =>
            {
                if (env.IsDevelopment())
                {
                    //把clientApp目录里面的程序通过yarn start启动起来就可以通过这里进行代理过来
                    spa.UseProxyToSpaDevelopmentServer(baseUri: "http://localhost:3100");
                }
            });
        }
    }
}
