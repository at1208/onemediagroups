const express = require("express");
const router = express.Router();

const { upload_file } = require("../controllers/upload_file_controller");
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');


router.post("/upload-file", requireSignin, authMiddleware, upload_file);


module.exports = router;
