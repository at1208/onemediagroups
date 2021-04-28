const { check } = require('express-validator');

exports.categoryCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),

    check('domain')
        .not()
        .isEmpty()
        .withMessage('Domain is required')
];
