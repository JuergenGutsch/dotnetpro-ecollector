using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KnoledgeCollector.Controllers
{
    [Route("api/[controller]")]
    public class CollectorController : Controller
    {
        // GET: api/values
        [HttpGet("{pagenumber}/{pageSize}")]
        public IEnumerable<string> Get(int pageNumber, int pageSize)
        {
            var items = A.ListOf<TimelineItem>(pageSize);

            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class TimelineItem
    {
    }
}
