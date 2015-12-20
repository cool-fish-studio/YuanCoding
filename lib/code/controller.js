'use strict';

var codeManager = require('./manager');

//添加
module.exports.insert = function (req, res, next) {
    if (!req.cookies['yuancoding_userID']) return res.status(403).send('cookie不存在');
    req.body.userID = req.cookies['yuancoding_userID'];
    req.body.id = req.params.codeID;
    codeManager.insert(req.body, function (error, code) {
        if (error) return res.status(400).send(error);
        res.send(code);
    });
};
//查看全部
module.exports.findAll = function (req, res, next) {
    res.json('ok');
};
//根据id查找
module.exports.getByID = function (req, res, next) {
    codeManager.getByID(req.params.codeID, function (error, info) {
        if (!info) info = {_id: req.params.codeID};
        res.render('editor', {data: info});
    });
};
//删除
module.exports.remove = function (req, res, next) {
    res.json('ok');
};
//修改
module.exports.update = function (req, res, next) {
    res.json('ok');
};