const express = require("express");
const router = express.Router();

const {apply_for_job,
        admin_update_job_status}    = require("../controllers/job_applicants_controller");
const {job_apply_validator} = require("../validators/job_apply_validations");
const {run_validation}        = require("../validators");

router.post("/apply/job/:job_id", job_apply_validator, run_validation, apply_for_job);
router.put("/admin/update/job/:_id", admin_update_job_status);

module.exports = router;
