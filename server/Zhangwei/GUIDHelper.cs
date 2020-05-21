using System;
using System.Collections.Generic;
using System.Text;

namespace Zhangwei.Common
{
    public class GUIDHelper
    {
        /// <summary>
        /// Guid.NewGuid();
        /// </summary>
        public static Guid Guid => Guid.NewGuid();
        /// <summary>
        /// GUID N形式（7c65c6b48f094edcb59b6eed81715165）的格式化字符串
        /// </summary>
        public static string GuidString => Guid.NewGuid().ToString("N");
    }
}
