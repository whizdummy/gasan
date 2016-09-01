using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Final.Controllers
{
    public class OfficialsController : Controller
    {
        // GET: Officials
        public ActionResult Index()
        {
            return View();
        }

        // GET: Officials/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Officials/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Officials/Create
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

        // GET: Officials/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Officials/Edit/5
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

        // GET: Officials/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Officials/Delete/5
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
