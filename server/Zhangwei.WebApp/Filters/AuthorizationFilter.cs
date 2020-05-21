using Zhangwei.WebApp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System.Linq;

namespace Zhangwei.Platform.Filters
{
    /// <summary>
    /// 授权过滤
    /// </summary>
    public class AuthorizationFilter : IAuthorizationFilter
    {
        public AuthorizationFilter()
        {
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <remarks>用于统一过滤登录用户的状态是否有效，如果无效，拒绝请求</remarks>
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            return;
        }
        /// <summary>
        /// 是否跳过请求url，比如登录请求
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        private bool SkipRequest(string url)
        {
            List<string> skipUrls = new List<string>()
            {
                "/api/user/login",
                "/api/user/islogin",
                "/download/package",
                "/api/install/action",
                "/api/install/state",
                "/api/images/updatestate",
                "/api/images/saveimagebyname",
                "/api/deployment/getdeploybyid",
                "/api/deployment/updatedeploystate",
                "/api/message/sendmsg",
                "/api/server/register"
            };
            url = url.ToLowerInvariant();
            return skipUrls.Any(p => url.IndexOf(p)==0);
        }
    }
}
