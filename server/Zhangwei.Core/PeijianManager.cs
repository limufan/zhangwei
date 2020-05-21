using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Zhangwei.Core
{
    public class PeijianManager
    {
        static object rukuLockObject = new object();

        public void Ruku(int peijianId, int shuliang)
        {
            lock(rukuLockObject)
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var pejianDataModel = context.Peijian.Where(p => p.Id == peijianId).FirstOrDefault();
                    pejianDataModel.Kucun += shuliang;

                    context.Peijian.Update(pejianDataModel);
                    context.SaveChanges();
                }
            }
        }

        public void Chuku(int peijianId, int shuliang)
        {
            lock (rukuLockObject)
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var pejianDataModel = context.Peijian.Where(p => p.Id == peijianId).FirstOrDefault();
                    pejianDataModel.Kucun -= shuliang;

                    context.Peijian.Update(pejianDataModel);
                    context.SaveChanges();
                }
            }
        }
    }
}
