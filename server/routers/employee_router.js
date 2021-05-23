const express = require("express");
const router = express.Router();

const { create_employee,
        onboard_employee,
        accept_onboard_invitation,
        update_employee,
        all_employee,
        single_employee,
        filter_employee,
        update_profile_picture,
        contact_number,
        signin  } = require("../controllers/employee_controller");

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');

const { check_permission } = require("../utils/permission");



router.post("/create/employee/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        create_employee);


router.get("/single/employees/:id/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        single_employee);

router.get("/all/employees/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        all_employee);

router.post("/filter/employees/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        filter_employee);

router.patch("/update/profile-picture/:id/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        update_profile_picture);

router.patch("/update/employee/:_id/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        update_employee);


router.post("/employee/contact-number/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        contact_number);

router.post("/signin",
       signin);

router.post("/accept/onboard/invitation",
      accept_onboard_invitation);

router.post("/onboard/employee/:employee_id",
        onboard_employee);

module.exports = router;
