using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Final.Controllers
{
    public class AnnouncementsController : Controller
    {
        // GET: Announcements
        public ActionResult Index()
        {
            return View();
        }

        // GET: Announcements/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Announcements/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Announcements/Create
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

        // GET: Announcements/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Announcements/Edit/5
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

        // GET: Announcements/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Announcements/Delete/5
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
