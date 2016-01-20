'use strict';

var Code = require('./model');
var helper = require('../util/helper');
var recordManager = require('../record/manager');

module.exports.getByID = Code.getByID;

module.exports.insert = function (data, callback) {
    if (!data.id || !data.userID || !data.codeText || !data.title) {
        return callback('参数不足');
    }
    var title = helper.html2Escape(data.title);
    Code.getByID(data.id, function (error, code) {
        if (error) return callback(error);
        if (!code) {
            Code.insert({
                _id: data.id,
                codeText: data.codeText,
                userID: data.userID,
                title: title
            }, function (error, info) {
                if (error) return callback(error);

                console.log(info);
                recordManager.insert({
                    codeID: info._id,
                    userID: info.userID,
                    title: info.title,
                    status: 'create'
                }, function (error, record) {
                    if (error) return callback(error);
                    callback(null, info);
                });
            });
        }
        if (code && code.userID === data.userID) {
            Code.update(
                code, {
                    codeText: data.codeText,
                    title: title
                }, function (error, info) {
                    if (error) return callback(error);
                    console.log(info);
                    recordManager.insert({
                        codeID: info._id,
                        userID: info.userID,
                        title: info.title,
                        status: 'update'
                    }, function (error, record) {
                        if (error) return callback(error);
                        callback(null, info);
                    });
                });
        }
        if (code && code.userID !== data.userID) {
            Code.insert({
                _id: helper.generateUUID(),
                codeText: data.codeText,
                userID: data.userID,
                title: title
            }, function (error, info) {
                if (error) return callback(error);
                console.log(info);
                recordManager.insert({
                    codeID: info._id,
                    userID: info.userID,
                    title: info.title,
                    forkID: data.id,
                    status: 'fork'
                }, function (error, record) {
                    if (error) return callback(error);
                    callback(null, info);
                });
            });
        }
    });
};

// var mongoCode = require('./model');
// var helper = require('../util/helper');
// var recordManager = require('../record/manager');

// module.exports.insert = function (data, callback) {
//     if(!data.id || !data.codeText || !data.title) {
//         return callback('参数不足');
//     }
//     var title = helper.html2Escape(data.title);
//     mongoCode.getByID(data.id, function (error, code) {
//         if (error) return callback(error);
//         //创建
//         if (!code)
//             mongoCode.insert(
//                 { _id: data.id, codeText: data.codeText, userID: data.userID, title: title }, 
//                 function (error, info) {
//                     if (error) return callback(error);
//                     var _code = info.ops[0];
//                     recordManager.insert({
//                         codeID: _code._id,
//                         userID: _code.userID,
//                         title: _code.title,
//                         status: 'create'
//                     }, function (error, record) {
//                         if (error) return callback(error);
//                         callback(null, _code);
//                     });
//                 });
//         //修改
//         if (code && code.userID === data.userID)
//             mongoCode.update(
//                 data.id, 
//                 { codeText: data.codeText, title: title }, function (error, info) {
//                     if (error) return callback(error);
//                     var _code = info.value;
//                     recordManager.insert({
//                         codeID: _code._id,
//                         userID: _code.userID,
//                         title: _code.title,
//                         status: 'update'
//                     }, function (error, record) {
//                         if (error) return callback(error);
//                         callback(null, _code);
//                     });
//                 });
//         //创建
//         if (code && code.userID !== data.userID)
//             mongoCode.insert(
//                 { _id: helper.getObjectID().toString(),codeText: data.codeText, userID: data.userID, title: title }, 
//                 function (error, info) {
//                     if (error) return callback(error);
//                     var _code = info.ops[0];
//                     recordManager.insert({
//                         codeID: _code._id,
//                         userID: _code.userID,
//                         title: _code.title,
//                         forkID: data.id,
//                         status: 'fork'
//                     }, function (error, record) {
//                         if (error) return callback(error);
//                         callback(null, _code);
//                     });
//                 });
//     });
// }

// module.exports.findByUserID = function (userID, pageNum, page, callback) {
//     mongoCode.findAll(pageNum, page, { userID: userID }, callback);
// };

// module.exports.update = mongoCode.update;

// module.exports.remove = mongoCode.remove;

// module.exports.getByID = mongoCode.getByID;

// module.exports.findAll = mongoCode.findAll;

// module.exports.count = mongoCode.count;