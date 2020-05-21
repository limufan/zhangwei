using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;

namespace Zhangwei.Common
{
    public class HttpHelper
    {
        /// <summary>
        /// HttpGet请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="HttpWebResponseString"></param>
        /// <returns></returns>
        public static bool HttpGet(string url, out string HttpWebResponseString)
        {
            try
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                // httpWebRequest.Timeout = 200;
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    HttpWebResponseString = result;
                }
                return true;
            }
            catch
            {
                HttpWebResponseString = "";
                return false;
            }
        }
    }
}
