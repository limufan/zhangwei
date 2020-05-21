using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Zhangwei.Data
{
    [Table("peijian")]
    public class PeijianDataModel
    {
        [Key]
        public int Id { set; get; }

        public string Name { set; get; }

        public string Tuhao { set; get; }

        public string Danwei { set; get; }

        public int Kucun { set; get; }

        public float Danjia { set; get; }

        public string Remark { set; get; }
    }
}
