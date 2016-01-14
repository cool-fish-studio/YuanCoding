'use strict';

var async = require('async');

var Code = require('./model');

//根据id查找数据
module.exports.getByID = Code.getByID.bind(Code);

//根据用户名查找数据
module.exports.findByCreatedByID = Code.findByCreatedByID.bind(Code);

//插入数据
module.exports.insert = function (userFields, callback) {
    var user = new Code(userFields);
    //检查数据格式
    Code.validateAndFormatError(user, function (error) {
        if (error) return callback(error, null);
        //录入数据
        user.save(callback);
    });
};

//查找全部
module.exports.findAll = function (callback) {
    //此类数据 返回格式包含列表和数量 用来处理后期分页问题
    async.parallel({
        total: Code.countAll.bind(Code),
        users: Code.findAll.bind(Code)
    }, function (error, args) {
        if (error) return callback(error, null);
        callback(
            null, 
            {
                meta: { count: args.total, length: args.users.length },
                list: args.users
            }
        );
    });
};
//修改
module.exports.update = function (user, updatedFields, callback) {
    for (var field in updatedFields)
        user[field] = updatedFields[field];

    Code.validateAndFormatError(user, function (error) {
        if (error) return callback(error, null);

        user.save(callback);
    });
};
