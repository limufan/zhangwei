using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zhangwei.WebApp.Models
{
    public class PeijianSearchModel
    {
        public string Keyword { set; get; }

        public int PageIndex { set; get; }

        public int PageSize { set; get; }

        public int Start { get { return (this.PageIndex - 1) * this.PageSize; } }
    }
}
