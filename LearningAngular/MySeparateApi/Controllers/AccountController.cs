using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MySeparateApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/account")]
    public class AccountController : ApiController
    {
        [Route("login"), HttpPost]
        public async Task<IHttpActionResult> Login(LoginViewModel loginModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (loginModel.Username == "hassaan.khan@dgsworld.com" && loginModel.Password == "test123")
                    {
                        return Ok("Welcome to the system");
                    }
                    else
                    {
                        return BadRequest("Incorrect Username or Password");
                    }
                }
                else
                {
                    return BadRequest("Username and Password required");
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }            
        }

        
    }

    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
