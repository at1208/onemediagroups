const { check } = require('express-validator');

exports.blogCreateValidator = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Blog Title is required'),

    check('body')
        .not()
        .isEmpty()
        .withMessage('Blog content is required'),

    check('categories')
        .not()
        .isEmpty()
        .withMessage('categories are required'),

    check('domain')
        .not()
        .isEmpty()
        .withMessage('domain is required'),

    check('featureImg')
        .not()
        .isEmpty()
        .withMessage('feature image is required'),
];
