using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using Zhangwei.Core;

namespace Zhangwei.WebApp
{
    public class WebHelper
    {
        static WebHelper()
        {
            PeijianManager = new PeijianManager();
        }

        static List<string> _loginUserAccounts = new List<string>();

        public static bool IsLogin(string account)
        {
            return _loginUserAccounts.Any(a => a == account);
        }

        public static void AddLoginUser(string account)
        {
            _loginUserAccounts.Add(account);
        }

        public static bool RemoveLoginUser(string account)
        {
            _loginUserAccounts.Remove(account);
            return true;
        }

        public static PeijianManager PeijianManager { set; get; }
    }
}
