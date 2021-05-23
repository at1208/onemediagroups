const express = require('express');
const router = express.Router();
const { create , list, filter_domain } = require('../controllers/domain_controller');

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');
const { check_permission } = require("../utils/permission");

router.post('/domain/:moduleType/:permission',
          requireSignin,
          authMiddleware,
          check_permission,
          create);

router.post('/domain/filter/:moduleType/:permission',
          requireSignin,
          authMiddleware,
          check_permission,
          filter_domain);

router.get('/domains/:moduleType/:permission',
          requireSignin,
          authMiddleware,
          check_permission,
          list);

module.exports = router;
