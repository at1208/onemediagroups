const express = require('express');
const router = express.Router();
const { create , list } = require('../controllers/domain_controller');

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');

router.post('/domain', requireSignin, authMiddleware,  create);
router.get('/domains', requireSignin, authMiddleware,  list);

module.exports = router;
