﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Final.Models;

namespace Web_Final.Controllers
{
    public class AdminAccountController : Controller
    {
        // GET: AdminAccount
        public ActionResult Index()
        {
            return View();
        }

        // GET: AdminAccount/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: AdminAccount/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AdminAccount/Create
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

        // GET: AdminAccount/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: AdminAccount/Edit/5
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

        // GET: AdminAccount/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AdminAccount/Delete/5
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
