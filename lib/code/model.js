'use strict';

var codeColl = require('../util/db').getCollection('code');

//创建
module.exports.insert = function (fields, callback) {
    var time = new Date().getTime();
    fields.createAt = time;
    fields.updateAt = time;
    fields.removed = false;
    codeColl.insert(fields, callback);
};
//修改
module.exports.update = function (codeID, fields, callback) {
    fields.updateAt = new Date().getTime();
    codeColl.findAndModify({ _id: codeID }, [], { $set: fields }, { new: true }, callback);
};
//删除
module.exports.remove = function (codeID, callback) {
    fields.updateAt = new Date().getTime();
    codeColl.findAndModify({ _id: codeID }, [], { $set: {removed: true} }, { new: true }, callback);
};
//根据ID查询某一个
module.exports.getByID = function (codeID, callback) {
    codeColl.findOne({_id: codeID, removed: false}, callback);
};
//根据条件查询一些 
module.exports.findAll = function (pageNum, page, info, callback) {
    info.removed = info.removed ? info.removed : false;
    codeColl.find(info).sort({'createAt':-1}).limit(pageNum).skip(pageNum * (page - 1)).toArray(callback);
};
//查询总数
module.exports.count = function (info, callback) {
    info.removed = info.removed ? info.removed : false;
    codeColl.count(info, callback);
};