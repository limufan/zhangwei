﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zhangwei.WebApp.Models
{
    public class PeijianKucunCreateModel
    {
        public int PeijianId { set; get; }

        public DateTime CreatedTime { set; get; }

        public int Shuliang { set; get; }

        public string Remark { set; get; }
    }
}
