const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');

const { create_task,
        update_task,
        delete_task,
        all_task,
        single_task,
        task_count_by_project,
        filter_task
      } = require("../controllers/task_controller");


const { create_task_validator } = require('../validators/task_validator');
const { run_validation }  = require('../validators/index');

router.post("/create/task", requireSignin, authMiddleware, create_task_validator, run_validation, create_task);
router.patch("/update/task/:_id", requireSignin, authMiddleware, update_task);
router.patch("/delete/task/:_id", requireSignin, authMiddleware, delete_task);
router.get("/all/task", requireSignin, authMiddleware, all_task);
router.get("/single/task/:_id", requireSignin, authMiddleware, single_task);
router.get("/task/count/:project_id",requireSignin, authMiddleware, task_count_by_project);
router.post("/task/filter",requireSignin, authMiddleware, filter_task);

module.exports = router;
