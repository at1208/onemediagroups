const express = require("express");
const router = express.Router();

const { get_notifications,
        change_notification_to_seen,
        get_all_notifications
       } = require('../controllers/notification_controller');

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');

const {notification_validator} = require("../validators/notification_validator");
const {run_validation}        = require("../validators");

router.get("/get/notification",
        requireSignin,
        authMiddleware,
        get_notifications);


router.get("/mark/seen/notification/:notifyId",
        requireSignin,
        authMiddleware,
        change_notification_to_seen);

router.get("/notifications/all",
        requireSignin,
        authMiddleware,
        get_all_notifications);


module.exports = router;
