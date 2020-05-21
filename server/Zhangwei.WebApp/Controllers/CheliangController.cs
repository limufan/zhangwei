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
    [Route("api/cheliang")]
    [ApiController]
    public class CheliangController : Controller
    {
        [Route("getList")]
        [HttpPost]
        public JsonResult GetList(CheliangSearchModel searchModel)
        {
            try
            {
                string[] allCheliangList = new string[] { "101", "102", "103", "105", "106", "107", "108", "109", "110", "111", "116", "113", "115", "117", "122", "123", "201", "202", "203", "205", "206", "207", "208", "209", "210", "211", "212", "213", "215", "216", "217", "1挖", "2挖", "3挖", "5挖", "1铲", "2铲" };

                if(!string.IsNullOrEmpty(searchModel.Keyword))
                {
                    var cheliangList = allCheliangList.Where(c => c.IndexOf(searchModel.Keyword) > -1).ToArray();

                    return Json(new { success = true, cheliangList = cheliangList });
                }

                return Json(new { success = true, cheliangList = allCheliangList });

            }
            catch(Exception ex)
            {
                return Json (new { success = false, message = ex.Message });
            }
        }
    }
}