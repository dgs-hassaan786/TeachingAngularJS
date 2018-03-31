using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MySeparateApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/data")]
    public class DataController : ApiController
    {
        [HttpGet, Route("users/{total}")]
        public async Task<IHttpActionResult> GetUsers(int total)
        {
            var list = new List<Users>();
            for (int i = 0; i < total; i++)
            {
                list.Add(new Users( i + 1, "User" + (i + 1), "FName" + (i + 1), "LName" + (i + 1)));
            }

            return Ok(list);
        }

    }

    public class Users
    {
        public Users()
        {

        }

        public Users(int id, string un, string fn, string ln)
        {
            ID = id;
            Username = un;
            FirstName = fn;
            LastName = ln;
        }
        public int ID { get; set; }
        public string Username { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
