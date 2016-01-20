'use strict';

var express = require('express');
var router = express.Router();

var codeController = require('./controller');

/**
 * 路由转发
 */

router.get('/ping', function (req, res, next) {
    res.end('OK');
});

router.get('/:codeID', codeController.getByID);

router.post('/:codeID', codeController.insert);

module.exports = router;