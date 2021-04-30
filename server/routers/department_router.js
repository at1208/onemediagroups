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


//ADMIN
router.post("/create/department", create_department_validator, run_validation, create_department);
router.patch("/update/department", create_department_validator, run_validation, update_department);
router.get("/all/department", requireSignin, authMiddleware, all_department);
router.post("/single/department/:_id", single_department);
router.patch("/delete/department/:_id", delete_department);


module.exports = router;
