using Zhangwei.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Zhangwei.Data;

namespace Zhangwei.Models.Context
{
    public class DbInitializer
    {
        public static void Initialize(ZhangweiContext context)
        {
#if DEBUG
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前1片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前2片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前3片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前4片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前5片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前6片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前7片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前8片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前9片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });
            context.Peijian.Add(new PeijianDataModel { Danjia = 1, Danwei = "个", Kucun = 10, Name = "SZ970000795前10片", Tuhao = "18*90" });

            context.Gongyingshang.Add(new GongyingshangDataModel { Name = "斯蒂芬斯蒂芬速度1" });
            context.Gongyingshang.Add(new GongyingshangDataModel { Name = "斯蒂芬斯蒂芬速度2" });
            context.Gongyingshang.Add(new GongyingshangDataModel { Name = "斯蒂芬斯蒂芬速度3" });
            context.Gongyingshang.Add(new GongyingshangDataModel { Name = "斯蒂芬斯蒂芬速度4" });

            context.SaveChanges();
#endif

        }
        
    }
}
