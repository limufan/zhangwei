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
                    if (!string.IsNullOrEmpty(searchModel.Name))
                    {
                        query = query.Where(p => p.PeijianName.IndexOf(searchModel.Name) > -1);
                    }
                    if(searchModel.RukuTimeRange != null && !searchModel.RukuTimeRange.IsEmpty)
                    {
                        if(searchModel.RukuTimeRange.StartTime.HasValue)
                        {
                            query = query.Where(p => p.RukuTime >= searchModel.RukuTimeRange.StartTime);
                        }
                        if (searchModel.RukuTimeRange.EndTime.HasValue)
                        {
                            query = query.Where(p => p.RukuTime <= searchModel.RukuTimeRange.EndTime);
                        }
                    }
                    if (!string.IsNullOrEmpty(searchModel.Tuhao))
                    {
                        query = query.Where(p => p.Tuhao.IndexOf(searchModel.Tuhao) > -1);
                    }
                    if (!string.IsNullOrEmpty(searchModel.Gongyingshang))
                    {
                        query = query.Where(p => p.Gongyingshang.IndexOf(searchModel.Gongyingshang) > -1);
                    }
                    if (!string.IsNullOrEmpty(searchModel.Remark))
                    {
                        query = query.Where(p => p.Remark.IndexOf(searchModel.Remark) > -1);
                    }

                    var kucunList = query.OrderByDescending(p => p.Id).ToList();

                    return Json(new {
                        success = true,
                        kucunList = kucunList.Skip(searchModel.Start).Take(searchModel.PageSize).ToArray(),
                        totalCount = kucunList.Count,
                        shuliangHeji = kucunList.Sum(k => k.Shuliang),
                        kucunHeji = kucunList.Sum(k => k.Kucun),
                        jineHeji = kucunList.Sum(k => k.Heji)
                    });
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
                    dataModel.Kucun = pejianDataModel.Kucun + webModel.Shuliang;
                    dataModel.Heji = dataModel.Danjia * webModel.Shuliang;
                    dataModel.CreatedTime = DateTime.Now;

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