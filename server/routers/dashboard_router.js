const express = require("express");
const router = express.Router();
const { info_count } = require("../controllers/dashboard_controller");

router.get("/dashboard/info", info_count);


module.exports = router;
