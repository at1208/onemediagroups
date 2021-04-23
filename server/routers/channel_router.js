const express = require("express");
const router = express.Router();

const { create_channel, get_channels_by_user, get_channel_details } = require("../controllers/channel_controller");
const { create_channel_validator } = require('../validators/channel_validator');
const { run_validation }  = require('../validators/index');


router.post("/create/channel", create_channel_validator, run_validation, create_channel);
router.get("/get/channels/:userId", get_channels_by_user);
router.get("/get/channels/details/:channelId", get_channel_details);

module.exports = router;
