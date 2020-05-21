using System;
using System.Collections.Generic;
using System.Text;

namespace Zhangwei
{
   public static class LogHelper
    {

        public static void Info(string info) {
            Console.WriteLine($"Info：{info}");
        }

        public static void Debug(string debug)
        {
            Console.WriteLine($"Debug：{debug}");
        }

        public static void Error(string error)
        {
            Console.WriteLine($"Error：{error}");
        }

        public static void Error(Exception ex)
        {
            Console.WriteLine($"Error：{ex.Message}, {ex.ToString()}");
        }

    }
}
