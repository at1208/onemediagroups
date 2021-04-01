const express = require("express");
const router = express.Router();

const { create_leave_request,
        delete_leave_request,
        all_leave_requests,
        update_leave_request,
        admin_update_leave_request } = require("../controllers/leave_request_controller");
const {leave_request_validator} = require("../validators/leave_request_validator");
const {run_validation}        = require("../validators");

router.post("/create/leave_request", leave_request_validator, run_validation, create_leave_request);
router.patch("/update/leave_request", leave_request_validator, run_validation, update_leave_request);
router.get("/all/leave_request/:employee_id",  all_leave_requests);
router.delete("/delete/leave_request/:_id", delete_leave_request);

// modify  for admin 
router.post("/admin/update/:leave_request_id", admin_update_leave_request);
//common for both admin and employee
// need to discuersss  didn 't made that
// for getting leaves of all the employee under the particular hr we need to assign the 
//the emplouyees under the hr


module.exports = router;
