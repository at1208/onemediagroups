const express = require("express");
const router = express.Router();

const {create_leave_type, 
       update_leave_type, 
       single_leave_type,
       all_leave_types,
       delete_leave_type}    = require("../controllers/leave_controller");
const {leave_type_validator} = require("../validators/leave_validator");
const {run_validation}        = require("../validators");

router.post("/create/leave_type", leave_type_validator, run_validation, create_leave_type);
// router.patch("/update/leave_type", leave_type_validator, run_validation, update_leave_type);
router.get("/all/leave_type",  all_leave_types);
router.post("/single/leave_type/:_id", single_leave_type);
router.patch("/delete/leave_type/:_id", delete_leave_type);

module.exports = router;
