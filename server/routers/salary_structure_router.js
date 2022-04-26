const express = require("express");
const router = express.Router();
const {
  requireSignin,
  authMiddleware,
} = require("../controllers/employee_controller");

const {
  create_salary_structure,
  get_salary_structure,
  get_all_accounts,
} = require("../controllers/salary_structure_controller");

router.post(
  "/create/salaryStructure",
  requireSignin,
  authMiddleware,
  create_salary_structure
);
router.get(
  "/get/salaryStructure",
  requireSignin,
  authMiddleware,
  get_salary_structure
);

router.get(
  "/get/salaryStructure/:employee",
  requireSignin,
  authMiddleware,
  get_salary_structure
);

router.get("/get/allAccounts", get_all_accounts);

module.exports = router;
