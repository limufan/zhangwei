using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Zhangwei.Common;
using Zhangwei.Data;
using Zhangwei.WebApp.Models;

namespace Zhangwei.WebApp.Controllers
{
    [Route("api/peijianKucun")]
    [ApiController]
    public class PeijianKucunController : Controller
    {
        [Route("getList")]
        [HttpPost]
        public JsonResult GetList(PeijianKucunSearchModel searchModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var query = context.PeijianKucun.AsQueryable();
                    if (!string.IsNullOrEmpty(searchModel.Keyword))
                    {
                        query = query.Where(p => p.PeijianName.IndexOf(searchModel.Keyword) > -1);
                    }
                    if(searchModel.CreatedTimeRange != null && !searchModel.CreatedTimeRange.IsEmpty)
                    {
                        if(searchModel.CreatedTimeRange.StartTime.HasValue)
                        {
                            query = query.Where(p => p.CreatedTime >= searchModel.CreatedTimeRange.StartTime);
                        }
                        if (searchModel.CreatedTimeRange.EndTime.HasValue)
                        {
                            query = query.Where(p => p.CreatedTime <= searchModel.CreatedTimeRange.EndTime);
                        }
                    }

                    var kucunList = query.ToList();
                    return Json(new { success = true, kucunList = kucunList, shuliangHeji = kucunList.Sum(k => k.Shuliang), kucunHeji = kucunList.Sum(k => k.Kucun), jineHeji = kucunList.Sum(k => k.Heji) });
                }
            }
            catch(Exception ex)
            {
                return Json (new { success = false, message = ex.Message });
            }
        }

        [Route("create")]
        [HttpPost]
        public JsonResult Create(PeijianKucunCreateModel webModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var pejianDataModel = context.Peijian.Where(p => p.Id == webModel.PeijianId).FirstOrDefault();
                    PeijianKucunDataModel dataModel = ObjectMapperHelper.Map<PeijianKucunDataModel>(webModel);
                    dataModel.PeijianId = pejianDataModel.Id;
                    dataModel.PeijianName = pejianDataModel.Name;
                    dataModel.Tuhao = pejianDataModel.Tuhao;
                    dataModel.Danwei = pejianDataModel.Danwei;
                    dataModel.Danjia = pejianDataModel.Danjia;
                    dataModel.Kucun = pejianDataModel.Kucun + webModel.Shuliang;
                    dataModel.Heji = pejianDataModel.Danjia * webModel.Shuliang;

                    context.PeijianKucun.Add(dataModel);
                    context.SaveChanges();
                }

                WebHelper.PeijianManager.Ruku(webModel.PeijianId, webModel.Shuliang);

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}