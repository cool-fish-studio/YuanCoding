'use strict';

var userColl = require('../util/db').getCollection('user');

//创建
module.exports.insert = function (fields, callback) {
    fields.createAt = new Date().getTime();
    fields.removed = false;
    userColl.insert(fields, callback);
};
//修改
module.exports.update = function (userID, fields, callback) {
    fields.updateAt = new Date().getTime();
    userColl.findAndModify({ _id: userID }, [], { $set: fields }, { new: true }, callback);
};
//删除
module.exports.remove = function (userID, callback) {
    userColl.findAndModify({ _id: userID }, [], { $set: {removed: true} }, { new: true }, callback);
};
//根据ID查询某一个
module.exports.getByID = function (userID, callback) {
    userColl.findOne({_id: userID, removed: false}, callback);
};
//根据email查询某一个
module.exports.getUserByMail = function (mail, callback) {
    userColl.findOne({mail: mail, removed: false}, callback);
};
//根据email修改某一个
module.exports.updateUserByMail = function (mail, fields, callback) {
    fields.updateAt = new Date().getTime();
    userColl.findAndModify({ mail: mail }, [], { $set: fields }, { new: true }, callback);
};
//根据条件查询一些 
module.exports.findAll = function (pageNum, page, info, callback) {
    info.removed = info.removed ? info.removed : false;
    userColl.find(info).sort({'createAt':-1}).limit(pageNum).skip(pageNum * (page - 1)).toArray(callback);
};
//查询总数
module.exports.count = function (info, callback) {
    info.removed = info.removed ? info.removed : false;
    userColl.count(info, callback);
};