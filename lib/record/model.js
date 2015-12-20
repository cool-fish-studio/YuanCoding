'use strict';

var recordColl = require('../util/db').getCollection('record');

//创建
module.exports.insert = function (fields, callback) {
    var time = new Date().getTime();
    fields.createAt = time;
    recordColl.insert(fields, callback);
};
//根据条件查询一些 
module.exports.findAll = function (pageNum, page, callback) {
    recordColl.find({}).sort({'createAt':-1}).limit(pageNum).skip(pageNum * (page - 1)).toArray(callback);
};
//查询总数
module.exports.count = function (info, callback) {
    recordColl.count({}, callback);
};