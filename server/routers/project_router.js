const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');

const { create_project,
        delete_project,
        all_project,
        single_project,
        update_project} = require("../controllers/project_controller");

//ADMIN
router.post("/create/project", requireSignin, authMiddleware, create_project);
router.patch("/update/project/:_id", requireSignin, authMiddleware, update_project);
router.patch("/delete/project/:_id",requireSignin, authMiddleware, delete_project);
router.get("/all/project", requireSignin, authMiddleware, all_project);
router.get("/single/project/:_id",requireSignin, authMiddleware, single_project);

module.exports = router;
