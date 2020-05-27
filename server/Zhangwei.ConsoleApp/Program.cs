using System;
using Zhangwei.Core;

namespace Zhangwei.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            while(true)
            {
                var cmd = Console.ReadLine();
                if(cmd == "tag")
                {
                    PeijianManager peijianManager = new PeijianManager();
                    peijianManager.UpdateTag();
                }
            }
        }
    }
}
