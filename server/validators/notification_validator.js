const { check } = require('express-validator');

exports.notification_validator = [
      check('Title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),

      check('Description')
      .not()
      .isEmpty()
      .withMessage('description is required'),

      check('notification_for_whom')
      .not()
      .isEmpty()
      .withMessage('notification_for_whom is required'),

];
