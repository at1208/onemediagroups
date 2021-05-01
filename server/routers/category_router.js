const express = require('express');
const router = express.Router();
const { create, list, filter_category } = require('../controllers/category_controller');
const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');
// validators
const { run_validation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category_validator');


router.post('/category',
        requireSignin,
        authMiddleware,
        categoryCreateValidator,
        run_validation,
        create);

router.post('/filter/category',
        requireSignin,
        authMiddleware,
        filter_category);
router.get('/categories', list);

module.exports = router;
