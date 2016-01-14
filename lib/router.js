'use strict';

var errorHandler = require('./util/errorHandler');
var viewController = require('./view/controller');
var userController = require('./user/controller');

module.exports = function (app) {
    //附加cookie
    app.get('*', userController.setSession);
    //用来检测运行是否成功
    app.get('/ping', function (req, res) {
        res.end('OK');
    });
    //首页
    app.get('/', viewController.index);
    //三方登录
    app.use('/auth', require('./auth/router'));
    //编辑器
    app.get('/code', viewController.redirectCode);
    app.use('/code', require('./code/router'));


    // 错误拦截
    app.use(errorHandler.handler404);
    app.use(errorHandler.errorHandler);
};