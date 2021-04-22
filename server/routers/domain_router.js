const express = require('express');
const router = express.Router();
const { create , list } = require('../controllers/domain_controller');


router.post('/domain', create);
router.get('/domains', list);

module.exports = router;
