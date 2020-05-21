using System;
using System.Collections.Generic;
using System.Text;

namespace Zhangwei
{
    public class DateRange
    {
        public DateTime? StartTime { set; get; }

        public DateTime? EndTime { set; get; }

        public bool IsEmpty 
        { 
            get
            { 
                if(this.StartTime.HasValue)
                {
                    return false;
                }
                if (this.EndTime.HasValue)
                {
                    return false;
                }

                return true;
            } 
        }
    }
}
