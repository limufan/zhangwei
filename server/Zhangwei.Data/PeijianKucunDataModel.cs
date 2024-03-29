﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Zhangwei.Data
{
    [Table("peijian_kucun")]
    public class PeijianKucunDataModel
    {
        [Key]
        public int Id { set; get; }

        public int PeijianId { set; get; }

        public string PeijianName { set; get; }

        public string Tuhao { set; get; }

        public string Danwei { set; get; }

        public float Danjia { set; get; }

        public DateTime RukuTime { set; get; }

        public DateTime CreatedTime { set; get; }

        public int Shuliang { set; get; }

        public string Gongyingshang { set; get; }

        public int Kucun { set; get; }

        public float Heji { set; get; }

        public string Leixing { set; get; }

        public string Remark { set; get; }
    }
}
