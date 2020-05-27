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
    [Route("api/peijian")]
    [ApiController]
    public class PeijianController : Controller
    {

        [Route("create")]
        [HttpPost]
        public JsonResult Create(PeijianCreateModel webModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    PeijianDataModel dataModel = ObjectMapperHelper.Map<PeijianDataModel>(webModel);

                    context.Peijian.Add(dataModel);
                    context.SaveChanges();
                }

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [Route("edit")]
        [HttpPost]
        public JsonResult Edit(PeijianDataModel webModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var dataModel = context.Peijian.Where(p => p.Id == webModel.Id).First();
                    ObjectMapperHelper.Map(dataModel, webModel);

                    context.Peijian.Update(dataModel);
                    context.SaveChanges();
                }

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [Route("getById")]
        [HttpGet]
        public JsonResult GetById(int peijianId)
        {
            try
            {
                PeijianDataModel dataModel = null;
                using (var context = ZhangweiContextFactory.Create())
                {
                    dataModel = context.Peijian.Where(p => p.Id == peijianId).First();
                }

                return Json(new { success = true, peijian = dataModel });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [Route("getList")]
        [HttpPost]
        public JsonResult GetList(PeijianSearchModel searchModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var query = context.Peijian.AsQueryable();
                    List<PeijianDataModel> peijianList = null;
                    if (!string.IsNullOrEmpty(searchModel.Keyword))
                    {
                        query = query
                            .Where(p => p.Name.IndexOf(searchModel.Keyword) > -1);
                    }

                    peijianList = query
                            .OrderByDescending(p => p.Id)
                            .ToList();

                    return Json(new { 
                        success = true, 
                        peijianList = peijianList.Skip(searchModel.Start).Take(searchModel.PageSize),
                        totalCount = peijianList.Count
                    });
                }
            }
            catch(Exception ex)
            {
                return Json (new { success = false, message = ex.Message });
            }
        }

        [Route("GetAutoCompleteList")]
        [HttpPost]
        public JsonResult GetAutoCompleteList(PeijianSearchModel searchModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    List<PeijianDataModel> peijianList = null;
                    if (string.IsNullOrEmpty(searchModel.Keyword))
                    {
                        peijianList = context.Peijian.ToList();
                    }
                    else
                    {
                        peijianList = context.Peijian.Where(p => p.Name.IndexOf(searchModel.Keyword) > -1).Take(30).ToList();
                    }
                    return Json(new { success = true, peijianList = peijianList });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}