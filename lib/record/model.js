// 'use strict';

'use strict';

var recordApi = require('../api/v1/record/controller');

//根据ID查询某一个
module.exports.getByID = function (recordID, callback) {
    recordApi.getByID(recordID, callback);
};

//创建
module.exports.insert = function (fields, callback) {
    recordApi.insert(fields, callback);
};



// var recordColl = require('../util/db').getCollection('record');

// //创建
// module.exports.insert = function (fields, callback) {
//     var time = new Date().getTime();
//     fields.createAt = time;
//     recordColl.insert(fields, callback);
// };
// //根据条件查询一些 
// module.exports.findAll = function (pageNum, page, callback) {
//     recordColl.find({}).sort({'createAt':-1}).limit(pageNum).skip(pageNum * (page - 1)).toArray(callback);
// };
// //查询总数
// module.exports.count = function (info, callback) {
//     recordColl.count({}, callback);
// };