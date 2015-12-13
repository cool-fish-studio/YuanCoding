var express = require('express');
var router = express.Router();

var codeController = require('./code/controller'),
    viewController = require('./view/controller');

/* GET home page. */
router.get('/', viewController.home);
router.get('/ping', function(req, res, next) {
    res.end('OK');
});

//代码
router.get('/code', codeController.findAll);
router.get('/code/:codeID', codeController.getByID);
router.post('/code', codeController.insert);
router.post('/code/:codeID/remove', codeController.remove);
router.post('/code/:codeID/update', codeController.update);

module.exports = router;
