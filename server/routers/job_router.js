const express = require("express");
const router = express.Router();

const { create_job,
        update_job,
        get_all_jobs, 
        delete_job,
        get_particular_job}    = require("../controllers/job_controller");
const {job_create_validator} = require("../validators/job_create_validation");
const {run_validation}        = require("../validators");

router.post("/create/job/:posted_by", job_create_validator, run_validation, create_job);
router.put("/update/:_id", job_create_validator, run_validation, update_job);
router.get("/all/jobs/:posted_by",  get_all_jobs);
router.get("/single/job/:_id", get_particular_job);
router.delete("/delete/job/:_id", delete_job);


module.exports = router;
