using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zhangwei.WebApp.Models
{
    public class WeixiuSearchModel
    {
        public string Keyword { set; get; }

        public string CheliangName { set; get; }

        public string PeijianName { set; get; }

        public string Tuhao { set; get; }

        public string Remark { set; get; }

        public DateRange WeixiuTimeRange { set; get; }

        public int PageIndex { set; get; }

        public int PageSize { set; get; }

        public int Start { get { return (this.PageIndex - 1) * this.PageSize; } }
    }
}
