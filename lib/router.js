var express = require('express');
var router = express.Router();

var codeController = require('./code/controller'),
    userController = require('./user/controller'),
    viewController = require('./view/controller');

/* GET home page. */
router.get('/', userController.setSession, viewController.home);
router.get('/ping', function(req, res, next) {
    res.end('OK');
});

//代码
router.get('/code', userController.setSession, viewController.redirectCode);
router.get('/code/:codeID', userController.setSession, codeController.getByID);
router.get('/:codeID/result', userController.setSession, viewController.result);
router.post('/code/:codeID', codeController.insert);
// router.post('/code/:codeID/remove', codeController.remove);
// router.post('/code/:codeID/update', codeController.update);

module.exports = router;
