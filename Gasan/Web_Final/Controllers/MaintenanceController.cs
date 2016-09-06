using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Final.Models;

namespace Web_Final.Controllers
{
    public class MaintenanceController : Controller
    {
        // GET: Maintenance
        public ActionResult Index()
        {
            //Int32 adminID = Convert.ToInt32(Session["AdminID"].ToString());

            GasanDataEntities gasanEntity = new GasanDataEntities();

            var queryResult = (from mun in gasanEntity.Municipalities
                               join munAdm in gasanEntity.Municipality_Admin
                               on mun.MunicipalityID equals munAdm.MunicipalityID
                               where munAdm.AdminID == 1
                               select new
                               {
                                   MunicipalityID   = mun.MunicipalityID,
                                   Mission          = mun.Mission,
                                   Vision           = mun.Vision
                               }).First();

            ViewData["Mission"] = queryResult.Mission;
            ViewData["Vision"]  = queryResult.Vision;

            return View();
        }

        // GET: Maintenance/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Maintenance/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Maintenance/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Maintenance/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Maintenance/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Maintenance/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Maintenance/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
