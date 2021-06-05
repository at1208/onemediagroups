const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');

const { get_private_chats,
        read_private_message,
        unread_messages } = require("../controllers/private_chat_controller");

router.post("/chat/private/:receiverId",
            requireSignin,
            authMiddleware,
            get_private_chats );

router.get("/chat/private/readstatus/:messageId",
            requireSignin,
            authMiddleware,
            read_private_message );


router.get("/chat/private/unread_messages",
            requireSignin,
            authMiddleware,
            unread_messages );

module.exports = router;
