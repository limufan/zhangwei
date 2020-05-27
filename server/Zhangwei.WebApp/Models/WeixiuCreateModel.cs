using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zhangwei.WebApp.Models
{
    public class WeixiuCreateModel
    {
        public string CheliangName { set; get; }

        public int PeijianId { set; get; }

        public DateTime WeixiuTime { set; get; }

        public int Shuliang { set; get; }

        public string Remark { set; get; }
    }
}
