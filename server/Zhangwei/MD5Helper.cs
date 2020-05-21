using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Zhangwei.Common
{
    public static class MD5Helper
    {
        /// <summary>
        /// 计算消息 md5摘要
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static string MD5Hash(string message)
        {
            using (MD5 md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(message));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "");
            }
        }
    }
}
