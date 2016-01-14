'use strict';

var helper = require('../api/util/helper');

// var codeManager = require('../code/manager');
// var helper = require('../util/helper');
// var recordManager = require('../record/manager');

// //添加
// module.exports.home = function (req, res, next) {
//     var pageNum = req.query.pageNum || 10; //获取几条数据
//     var page = req.query.page || 1;//获取第几页的数据 从1开始

//     recordManager.findAll(pageNum, page, function (error, list) {
//         if (error) return next(error);
//         res.render('index', {records: list});
//     });
// };
// //编辑器
// module.exports.redirectCode = function (req, res, next) {
//     var id = helper.getObjectID().toString();
//     res.redirect('/code/' + id);
// };
// //预览
// module.exports.result = function (req, res, next) {
//     codeManager.getByID(req.params.codeID, function (error, result) {
//         if (error) return next(error);
//         result ? res.send(result.codeText) : res.send('请先保存代码，才可浏览。');
//     });
// };

//首页
module.exports.index = function (req, res, next) {
    res.render('index');
};

//编辑器
module.exports.redirectCode = function (req, res, next) {
    var id = helper.generateUUID();
    res.redirect('/code/' + id);
}