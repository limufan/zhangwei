using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Zhangwei.Data
{
    [Table("gongyingshang")]
    public class GongyingshangDataModel
    {
        [Key]
        public int Id { set; get; }

        public string Name { set; get; }
    }
}
