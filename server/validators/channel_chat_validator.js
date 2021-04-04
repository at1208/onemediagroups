const { check } = require('express-validator');

exports.create_channel_chat_validator = [
    check('message')
        .not()
        .isEmpty()
        .withMessage('Message is required'),

    check('senderId')
        .not()
        .isEmpty()
        .withMessage('senderId is required'),

    check('channelId')
        .not()
        .isEmpty()
        .withMessage('channelId is required'),

    check('timestamp')
        .not()
        .isEmpty()
        .withMessage('timestamp is required'),
];
