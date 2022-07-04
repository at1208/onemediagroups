const express = require("express");
const router = express.Router();
const { info_count } = require("../controllers/dashboard_controller");

const {
  requireSignin,
  authMiddleware,
} = require("../controllers/employee_controller");

router.get("/dashboard/info", requireSignin, authMiddleware, info_count);

module.exports = router;
