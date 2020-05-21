using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Zhangwei.Data
{
    [Table("weixiu")]
    public class WeixiuDataModel
    {
        [Key]
        public int Id { set; get; }

        public string CheliangName { set; get; }

        public int PeijianId { set; get; }

        public string PeijianName { set; get; }

        public string Tuhao { set; get; }

        public string Danwei { set; get; }

        public DateTime CreatedTime { set; get; }

        public int Shuliang { set; get; }

        public int Kucun { set; get; }

        public float Danjia { set; get; }

        public float Jine { set; get; }

        public float Heji { set; get; }

        public string Remark { set; get; }
    }
}
