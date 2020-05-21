using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zhangwei.Common
{
    /// <summary>
    /// 文件大小转换器
    /// </summary>
    public static class FileSizeHelper
    {
        /// <summary>
        /// Byte转换为Kb为单位
        /// </summary>
        /// <param name="bytes">字节数</param>
        /// <returns></returns>
        public static double ToKb(long bytes)
        {
            return bytes / 1024;
        }
        /// <summary>
        /// Byte转换为Mb为单位
        /// </summary>
        /// <param name="bytes">字节数</param>
        /// <returns></returns>
        public static double ToMb(long bytes)
        {
            return ToKb(bytes) / 1024;
        }

        /// <summary>
        /// Byte转换为Gb为单位
        /// </summary>
        /// <param name="bytes">字节数</param>
        /// <returns></returns>
        public static double ToGb(long bytes)
        {
            return ToMb(bytes) / 1024;
        }

        /// <summary>
        /// Byte转换为Tb为单位
        /// </summary>
        /// <param name="bytes">字节数</param>
        /// <returns></returns>
        public static double ToTb(long bytes)
        {
            return ToGb(bytes) / 1024;
        }
    }
}
