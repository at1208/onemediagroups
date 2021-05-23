const express = require("express");
const router = express.Router();

const {create_designation,
       all_designations,
       single_designation,
       delete_designation,
       update_designation }  =require("../controllers/designation_controller");
const {designation_validator} = require("../validators/designation_validations");
const {run_validation}        = require("../validators");

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');

const { check_permission } = require("../utils/permission");

router.post("/create/designation/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        designation_validator,
        run_validation,
        create_designation);

router.patch("/update/designation/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        designation_validator,
        run_validation,
        update_designation);

router.get("/all/designation/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        requireSignin,authMiddleware,
        check_permission,
        all_designations);

router.post("/single/designation/:_id/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        single_designation);

router.patch("/delete/designation/:_id/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        delete_designation);


module.exports = router;
