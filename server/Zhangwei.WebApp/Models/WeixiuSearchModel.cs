using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zhangwei.WebApp.Models
{
    public class WeixiuSearchModel
    {
        public string Keyword { set; get; }

        public DateRange CreatedTimeRange { set; get; }
    }
}
