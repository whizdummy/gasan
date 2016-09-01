using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Web_Final.Startup))]
namespace Web_Final
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
