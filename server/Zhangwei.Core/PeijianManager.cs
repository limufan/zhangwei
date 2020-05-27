using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Zhangwei.Data;
using Zhangwei.Pinyin;

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

        public void UpdateTag()
        {
            using (var context = ZhangweiContextFactory.Create())
            {
                var peijianList = context.Peijian.ToList();
                foreach(var model in peijianList)
                {
                    model.Tag = this.GetTag(model);
                    context.Peijian.Update(model);
                    context.SaveChanges();
                }
            }
        }

        public string GetTag(PeijianDataModel model)
        {
            return PinyinProvider.Instance.GetJianma(model.Name) + model.Tuhao + PinyinProvider.Instance.GetQuanpin(model.Name) + model.Tuhao;
        }
    }
}
