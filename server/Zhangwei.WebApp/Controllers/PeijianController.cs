using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Zhangwei.Data;
using Zhangwei.WebApp.Models;

namespace Zhangwei.WebApp.Controllers
{
    [Route("api/peijian")]
    [ApiController]
    public class PeijianController : Controller
    {
        [Route("getList")]
        [HttpPost]
        public JsonResult GetList(PeijianSearchModel searchModel)
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
                        peijianList = context.Peijian.Where(p => p.Name.IndexOf(searchModel.Keyword) > -1).ToList();
                    }
                    return Json(new { success = true, peijianList = peijianList });
                }
            }
            catch(Exception ex)
            {
                return Json (new { success = false, message = ex.Message });
            }
        }
    }
}