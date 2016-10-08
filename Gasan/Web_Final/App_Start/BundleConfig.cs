using System.Web;
using System.Web.Optimization;

namespace Web_Final
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/firebase").Include(
                "~/Scripts/firebase.js",
                "~/Scripts/app_firebase.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                    "~/Scripts/angular.min.js",
                    "~/Scripts/app_angular.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular-main").Include(
                        "~/Scripts/Main/history_main.js",
                        "~/Scripts/Main/banner_main.js",
                        "~/Scripts/Main/announcement_main.js",
                        "~/Scripts/Main/event_main.js",
                        "~/Scripts/Main/official_main.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular-maintenance").Include(
                        "~/Scripts/Maintenance/mission_vision_maintenance.js",
                        "~/Scripts/Maintenance/logo_maintenance.js",
                        "~/Scripts/Maintenance/history_maintenance.js",
                        "~/Scripts/Maintenance/announcement_maintenance.js",
                        "~/Scripts/Maintenance/event_maintenance.js",
                        "~/Scripts/Maintenance/banner_maintenance.js",
                        "~/Scripts/Maintenance/position_maintenance.js",
                        "~/Scripts/Maintenance/official_maintenance.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(                     
                      "~/Scripts/respond.js",
                      "~/Scripts/modernizr-2.6.2.min.js",
                      "~/Scripts/jquery.min.js",
                      "~/Scripts/owl.carousel.min.js",
                      "~/Scripts/wow.min.js",
                      "~/Scripts/slider.js",
                      "~/Scripts/jquery.fancybox.js",
                      "~/Scripts/main.js",
                      "~/Scripts/jquery-ui.custom.min.js",
                      "~/Scripts/daterangepicker.min.js",
                      "~/Scripts/vertical_tabs.js",
                      "~/Scripts/fileinput.js",
                      "~/Scripts/bootstrap.min.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/fileinput.css",
                      "~/Content/ionicons.min.css",
                      "~/Content/animate.css",
                      "~/Content/slider.css",
                      "~/Content/owl.carousel.css",
                      "~/Content/owl.theme.css",
                      "~/Content/jquery.fancybox.css",
                      "~/Content/main.css",
                      "~/Content/responsive.css",
                      "~/Content/daterangepicker.min.css",
                      "~/Content/vertical_tab.css"                      
                      ));
        }
    }
}
