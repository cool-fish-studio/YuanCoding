'use strict';

var express = require('express');
var router = express.Router();

var authController = require('./controller');

/**
 * 路由转发
 */

router.get('/ping', function (req, res, next) {
    res.end('OK');
});

router.get('/by/github', authController.passportByGithub);
router.get('/by/github/:next', authController.passportCallbackByGithub);


module.exports = router;