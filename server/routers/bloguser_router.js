const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/bloguser_controller');


router.post('/google/onetap/login', signup);


module.exports = router;
