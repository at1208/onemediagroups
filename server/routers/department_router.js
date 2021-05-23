const express = require("express");
const router = express.Router();

const { create_department,
        update_department,
        all_department,
        delete_department,
        single_department } = require("../controllers/department_controller");


const { create_department_validator } = require('../validators/department_validator');
const { run_validation }  = require('../validators/index');

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');


const { check_permission } = require("../utils/permission");

//ADMIN
router.post("/create/department/:moduleType/:permission",
       requireSignin,
       authMiddleware,
       check_permission,
       create_department_validator,
       run_validation,
       create_department);

router.patch("/update/department/:moduleType/:permission",
       requireSignin,
       authMiddleware,
       check_permission,
       create_department_validator,
       run_validation,
       update_department);

router.get("/all/department/:moduleType/:permission",
       requireSignin,
       authMiddleware,
       check_permission,
       all_department);

router.post("/single/department/:_id/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      single_department);

router.patch("/delete/department/:_id/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      delete_department );


module.exports = router;
