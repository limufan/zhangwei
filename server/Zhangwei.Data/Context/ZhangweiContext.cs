using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Zhangwei.Data;

namespace Zhangwei.Models.Context
{
    /// <summary>
    /// 运维数据库上下文
    /// </summary>
    public class ZhangweiContext: DbContext
    {
        public ZhangweiContext(DbContextOptions<ZhangweiContext> options) : base(options)
        {

        }

        public DbSet<PeijianDataModel> Peijian { get; set; }

        public DbSet<PeijianKucunDataModel> PeijianKucun { get; set; }

        public DbSet<WeixiuDataModel> Weixiu { get; set; }

        public DbSet<GongyingshangDataModel> Gongyingshang { get; set; }
    }
}
