const express = require("express");
const router = express.Router();

const { create_task,
        update_task,
        delete_task,
        all_task,
        single_task,
        task_count_by_project
      } = require("../controllers/task_controller");


const { create_task_validator } = require('../validators/task_validator');
const { run_validation }  = require('../validators/index');

router.post("/create/task", create_task_validator, run_validation, create_task);
router.patch("/update/task/:_id", update_task);
router.patch("/delete/task/:_id", delete_task);
router.get("/all/task", all_task);
router.get("/single/task/:_id", single_task);
router.get("/task/count/:project_id", task_count_by_project);


module.exports = router;
