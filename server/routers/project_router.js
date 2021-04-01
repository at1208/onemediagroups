const express = require("express");
const router = express.Router();

const { create_project,
        delete_project,
        all_project,
        single_project,
        update_project} = require("../controllers/project_controller");

//ADMIN
router.post("/create/project", create_project);
router.patch("/update/project/:_id", update_project);
router.patch("/delete/project/:_id", delete_project);
router.get("/all/project", all_project);
router.get("/single/project/:_id", single_project);

module.exports = router;
