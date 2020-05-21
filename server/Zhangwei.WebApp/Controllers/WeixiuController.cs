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
    [Route("api/weixiu")]
    [ApiController]
    public class WeixiuController : Controller
    {
        [Route("getList")]
        [HttpPost]
        public JsonResult GetList(WeixiuSearchModel searchModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var query = context.Weixiu.AsQueryable();
                    if (!string.IsNullOrEmpty(searchModel.Keyword))
                    {
                        query = query.Where(p => p.PeijianName.IndexOf(searchModel.Keyword) > -1 || p.CheliangName.IndexOf(searchModel.Keyword) > -1);
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

                    var weixiuList = query.ToList();
                    return Json(new { success = true, weixiuList = weixiuList, shuliangHeji = weixiuList.Sum(k => k.Shuliang), kucunHeji = weixiuList.Sum(k => k.Kucun), jineHeji = weixiuList.Sum(k => k.Heji) });
                }
            }
            catch(Exception ex)
            {
                return Json (new { success = false, message = ex.Message });
            }
        }

        [Route("create")]
        [HttpPost]
        public JsonResult Create(WeixiuCreateModel webModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var pejianDataModel = context.Peijian.Where(p => p.Id == webModel.PeijianId).FirstOrDefault();
                    WeixiuDataModel dataModel = ObjectMapperHelper.Map<WeixiuDataModel>(webModel);
                    dataModel.PeijianId = pejianDataModel.Id;
                    dataModel.PeijianName = pejianDataModel.Name;
                    dataModel.Tuhao = pejianDataModel.Tuhao;
                    dataModel.Danwei = pejianDataModel.Danwei;
                    dataModel.Danjia = pejianDataModel.Danjia;
                    dataModel.Kucun = pejianDataModel.Kucun - webModel.Shuliang;
                    dataModel.Heji = pejianDataModel.Danjia * webModel.Shuliang;

                    context.Weixiu.Add(dataModel);
                    context.SaveChanges();
                }

                WebHelper.PeijianManager.Chuku(webModel.PeijianId, webModel.Shuliang);

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}