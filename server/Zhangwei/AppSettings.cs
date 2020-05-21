using Zhangwei.Common;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Zhangwei
{
    public class AppSettings
    {
        static AppSettings()
        {
            SqliteConn = GetEnvironmentVariable("SqliteConn", "Data Source=sqlite/Zhangwei.db;");
#if DEBUG
            SqliteConn = GetEnvironmentVariable("SqliteConn", "Data Source=Zhangwei.db;");
#endif
            WebPort = GetEnvironmentVariable("WebPort", 80);
        }

        private static string GetEnvironmentVariable(string name, string defaultValue)
        {
            string value = Environment.GetEnvironmentVariable(name);
            if(string.IsNullOrEmpty(value))
            {
                value = defaultValue;
            }

            return value;
        }

        private static int GetEnvironmentVariable(string name, int defaultValue)
        {
            int value = defaultValue;
            string variableValue = Environment.GetEnvironmentVariable(name);
            if (!string.IsNullOrEmpty(variableValue))
            {
                int.TryParse(variableValue, out value);
            }

            return value;
        }

        /// <summary>
        /// web端口
        /// </summary>
        public static int WebPort { get; set; }

        /// <summary>
        /// Sqlite连接字符串
        /// </summary>
        public static string SqliteConn { get; set; }

    }
}
