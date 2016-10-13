using System.Security.Claims;
using System.Threading.Tasks;

namespace server.Authentication
{
    public interface IIdentityResolver
    {
        Task<ClaimsIdentity> GetIdentity(string email, string password);
    }
}