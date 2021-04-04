const { check } = require('express-validator');

exports.create_channel_validator = [
    check('channel_name')
        .not()
        .isEmpty()
        .withMessage('Channel name is required'),

    check('admins')
        .not()
        .isEmpty()
        .withMessage('admins is required'),

    check('members')
        .not()
        .isEmpty()
        .withMessage('members is required'),
];
