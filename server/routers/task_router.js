const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');

const { create_task,
        update_task,
        delete_task,
        all_task,
        single_task,
        task_count_by_project,
        filter_task,
        my_tasks
      } = require("../controllers/task_controller");


const { create_task_validator } = require('../validators/task_validator');
const { run_validation }  = require('../validators/index');

const { check_permission } = require("../utils/permission");

   router.post("/create/task/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        create_task_validator,
        run_validation,
        create_task);

   router.patch("/update/task/:_id/:moduleType/:permission",
        requireSignin,
        authMiddleware,
        check_permission,
        update_task);

   router.patch("/delete/task/:_id/:moduleType/:permission",
            requireSignin,
            authMiddleware,
            check_permission,
            delete_task);

   router.get("/all/task/:moduleType/:permission",
            requireSignin,
            authMiddleware,
            check_permission,
            all_task);

   router.get("/single/task/:_id/:moduleType/:permission",
           requireSignin,
           authMiddleware,
           check_permission,
           single_task);

   router.get("/task/count/:project_id/:moduleType/:permission",
          requireSignin,
          authMiddleware,
          check_permission,
          task_count_by_project);

   router.post("/task/filter/:moduleType/:permission",
           requireSignin,
           authMiddleware,
           check_permission,
           filter_task);

   router.get("/task/mytask/:moduleType/:permission",
           requireSignin,
           authMiddleware,
           check_permission,
           my_tasks);

module.exports = router;
