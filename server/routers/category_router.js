const express = require("express");
const router = express.Router();
const {
  create,
  list,
  filter_category,
  category_by_slug,
  random_blog_categories,
  category_list_by_domain,
} = require("../controllers/category_controller");
const {
  requireSignin,
  authMiddleware,
} = require("../controllers/employee_controller");
// validators
const { run_validation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category_validator");

const { check_permission } = require("../utils/permission");

router.post(
  "/category/:moduleType/:permission",
  requireSignin,
  authMiddleware,
  check_permission,
  categoryCreateValidator,
  run_validation,
  create
);

router.post(
  "/filter/category/:moduleType/:permission",
  requireSignin,
  authMiddleware,
  check_permission,
  filter_category
);

router.get(
  "/categories/:moduleType/:permission",
  requireSignin,
  authMiddleware,
  check_permission,
  list
);

router.get(
  "/categories/:domain/:moduleType/:permission",
  requireSignin,
  authMiddleware,
  check_permission,
  category_list_by_domain
);

//End User Application
router.get("/categories/:domainId", random_blog_categories);
router.get("/categoryList/:domain", category_list_by_domain);
router.get("/category/:domainId/:slug", category_by_slug);

module.exports = router;
