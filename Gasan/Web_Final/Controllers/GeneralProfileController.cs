﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Final.Controllers
{
    public class GeneralProfileController : Controller
    {
        // GET: GeneralProfile
        public ActionResult Index()
        {
            return View();
        }

        // GET: GeneralProfile/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: GeneralProfile/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: GeneralProfile/Create
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

        // GET: GeneralProfile/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: GeneralProfile/Edit/5
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

        // GET: GeneralProfile/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: GeneralProfile/Delete/5
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
