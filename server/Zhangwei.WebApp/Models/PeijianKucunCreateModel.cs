﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zhangwei.WebApp.Models
{
    public class PeijianKucunCreateModel
    {
        public int PeijianId { set; get; }

        public DateTime RukuTime { set; get; }

        public string Gongyingshang { set; get; }

        public int Shuliang { set; get; }

        public float Danjia { set; get; }

        public string Remark { set; get; }
    }
}
