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
    [Route("api/gongyingshang")]
    [ApiController]
    public class GongyingshangController : Controller
    {

        [Route("create")]
        [HttpPost]
        public JsonResult Create(GongyingshangDataModel webModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    GongyingshangDataModel dataModel = ObjectMapperHelper.Map<GongyingshangDataModel>(webModel);

                    context.Gongyingshang.Add(dataModel);
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
        public JsonResult Edit(GongyingshangDataModel webModel)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    var dataModel = context.Gongyingshang.Where(p => p.Id == webModel.Id).First();
                    ObjectMapperHelper.Map(dataModel, webModel);

                    context.Gongyingshang.Update(dataModel);
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
        public JsonResult GetById(int gongyingshangId)
        {
            try
            {
                GongyingshangDataModel dataModel = null;
                using (var context = ZhangweiContextFactory.Create())
                {
                    dataModel = context.Gongyingshang.Where(p => p.Id == gongyingshangId).First();
                }

                return Json(new { success = true, gongyingshang = dataModel });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [Route("GetAutoCompleteList")]
        [HttpGet]
        [HttpPost]
        public JsonResult GetAutoCompleteList(string name)
        {
            try
            {
                using (var context = ZhangweiContextFactory.Create())
                {
                    List<GongyingshangDataModel> gongyingshangList = null;
                    if (string.IsNullOrEmpty(name))
                    {
                        gongyingshangList = context.Gongyingshang.ToList();
                    }
                    else
                    {
                        gongyingshangList = context.Gongyingshang.Where(p => p.Name.IndexOf(name) > -1).Take(30).ToList();
                    }
                    return Json(new { success = true, gongyingshangList = gongyingshangList });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}