const express = require('express');
const router = express.Router();
const { create, filter_blog } = require('../controllers/blog_controller');

// validators
const { run_validation } = require('../validators');
const { blogCreateValidator } = require('../validators/blog_validator');
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');


router.post('/blog',  requireSignin, authMiddleware, blogCreateValidator, run_validation, create);
router.post('/blog/filter', filter_blog);


module.exports = router;
