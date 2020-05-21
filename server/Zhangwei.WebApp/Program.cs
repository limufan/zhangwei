using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zhangwei;
using Zhangwei.Models.Context;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

namespace Zhangwei.WebApp
{
    public class Program
    {
        public static T GetAppsettings<T>(string key) where T : class, new()
        {
            string keyDir = System.IO.Directory.GetCurrentDirectory();
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(keyDir)
                .Build();

            var appconfig = new ServiceCollection()
                .AddOptions()
                .Configure<T>(config.GetSection(key))
                .BuildServiceProvider()
                .GetService<IOptions<T>>()
                .Value;
            return appconfig;
        }
        public static void Main(string[] args)
        {
            //string str = GetFile64();
            //return;
            Console.Title = typeof(Program).Assembly.GetName().Name;

            if (!Directory.Exists(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "sqlite")))
            {
                Directory.CreateDirectory(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "sqlite"));
            }


            //订阅推送事件，提供给各个模块推送消息
            //ServerPushEvent serverPushEvent = new ServerPushEvent();
            //serverPushEvent.Send += (e) =>
            //{

            //};
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            var host = CreateWebHostBuilder(args).Build();
            AutoMigration(host);


            host.Run();

        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var builder = WebHost.CreateDefaultBuilder(args);
            builder.ConfigureLogging(logging => logging.AddFilter(level => level == LogLevel.Error));
            builder.UseKestrel((options) =>
            {
                //支持上传最大文件20G
                options.Limits.MaxRequestBodySize = 2048L * 1024L * 1024L * 10;
                options.Limits.MinRequestBodyDataRate = null;
                options.Limits.MinResponseDataRate = null;
            });
            builder.UseUrls($"http://0.0.0.0:{AppSettings.WebPort}");
            builder.UseStartup<Startup>();
            return builder;
        }
        /// <summary>
        /// 自动迁移代码
        /// </summary>
        /// <param name="host"></param>
        private static void AutoMigration(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ZhangweiContext>();
#if DEBUG
                    context.Database.EnsureCreated();
#else
                    context.Database.Migrate(); 
#endif
                    DbInitializer.Initialize(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred creating the DB.");
                }
            }
        }
    }
}
