using Zhangwei.Models.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zhangwei
{
    public class ZhangweiContextFactory
    {
        public static ZhangweiContext Create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ZhangweiContext>();
            optionsBuilder.UseSqlite(AppSettings.SqliteConn);
            optionsBuilder.UseLoggerFactory(LoggerFactory.Create(builder =>
            {
                builder
                    .AddFilter((category, level) => level == LogLevel.Error);
            }));
            return new ZhangweiContext(optionsBuilder.Options);
        }
    }
}
