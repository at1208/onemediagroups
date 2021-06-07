const express = require("express");
const router = express.Router();

const { create_channel_chat, get_channel_chats, read_channel_chat } = require("../controllers/channel_chat_controller");
const { create_channel_chat_validator } = require('../validators/channel_chat_validator');
const { run_validation }  = require('../validators/index');

const { check_permission } = require("../utils/permission");

const { requireSignin,
        authMiddleware } = require('../controllers/employee_controller');

  router.post("/create/channelchat/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      create_channel_chat_validator,
      run_validation,
      create_channel_chat
    );

  router.post("/get/channelchats/:channelId/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      get_channel_chats
    );

  router.get("/channelchat/read/:chatId/:userId/:moduleType/:permission",
      requireSignin,
      authMiddleware,
      check_permission,
      read_channel_chat
    );


module.exports = router;
