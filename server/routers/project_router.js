const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');

const { create_project,
        delete_project,
        all_project,
        single_project,
        update_project} = require("../controllers/project_controller");

const { check_permission } = require("../utils/permission");

//ADMIN
router.post("/create/project/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      create_project);

router.patch("/update/project/:_id/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      update_project);

router.patch("/delete/project/:_id/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      delete_project);

router.get("/all/project/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      all_project);

router.get("/single/project/:_id/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      single_project);

module.exports = router;
