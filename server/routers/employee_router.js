const express = require("express");
const router = express.Router();

const { create_employee,
        onboard_employee,
        accept_onboard_invitation,
        update_employee,
        all_employee,
        single_employee,
        filter_employee,
        contact_number,
        signin  } = require("../controllers/employee_controller");

//ADMIN
router.post("/create/employee",  create_employee);
router.post("/onboard/employee/:employee_id", onboard_employee);
router.get("/single/employees/:id", single_employee);
router.get("/all/employees", all_employee);
router.post("/filter/employees", filter_employee);

//EMPLOYEE
router.post("/accept/onboard/invitation", accept_onboard_invitation);
router.patch("/update/employee/:_id", update_employee);
router.post("/signin", signin);
router.post("/employee/contact-number", contact_number);

module.exports = router;
