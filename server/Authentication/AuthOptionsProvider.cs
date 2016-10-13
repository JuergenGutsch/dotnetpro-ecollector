using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace server.Authentication
{
    public class AuthOptionsProvider : IAuthOptionsProvider
    {
        public AuthOptionsProvider()
        {
            SecretKey = "mysupersecret_secretkey!123";
            SigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
            SigningCredentials = new SigningCredentials(SigningKey, SecurityAlgorithms.HmacSha256);

            ValidIssuer = "ExampleIssuer";
            ValidAudience = "ExampleAudience";

            Expiration = TimeSpan.FromMinutes(120);
        }

        public string SecretKey { get; }
        public SymmetricSecurityKey SigningKey { get; }
        public SigningCredentials SigningCredentials { get; }
        public string ValidIssuer { get; }
        public string ValidAudience { get; }
        public TimeSpan Expiration { get; }
    }

    public interface IAuthOptionsProvider
    {
        string SecretKey { get; }
        SymmetricSecurityKey SigningKey { get; }
        SigningCredentials SigningCredentials { get; }
        string ValidIssuer { get; }
        string ValidAudience { get; }
        TimeSpan Expiration { get; }
    }
}
