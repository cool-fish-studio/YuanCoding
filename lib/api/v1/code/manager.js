'use strict';

var async = require('async');

var Code = require('./model');

//根据id查找数据
module.exports.getByID = Code.getByID.bind(Code);

//根据用户名查找数据
module.exports.findByUserID = Code.findByUserID.bind(Code);

//插入数据
module.exports.insert = function (codeFields, callback) {
    var code = new Code(codeFields);
    //检查数据格式
    Code.validateAndFormatError(code, function (error) {
        if (error) return callback(error, null);
        //录入数据
        code.save(callback);
    });
};

//查找全部
module.exports.findAll = function (callback) {
    //此类数据 返回格式包含列表和数量 用来处理后期分页问题
    async.parallel({
        total: Code.countAll.bind(Code),
        codes: Code.findAll.bind(Code)
    }, function (error, args) {
        if (error) return callback(error, null);
        callback(
            null, 
            {
                meta: { count: args.total, length: args.codes.length },
                list: args.codes
            }
        );
    });
};
//修改
module.exports.update = function (code, updatedFields, callback) {
    for (var field in updatedFields)
        code[field] = updatedFields[field];

    Code.validateAndFormatError(code, function (error) {
        if (error) return callback(error, null);

        code.save(callback);
    });
};
