'use strict';

var async = require('async');

var Record = require('./model');

//根据id查找数据
module.exports.getByID = Record.getByID.bind(Record);

//根据用户名查找数据
module.exports.findByUserID = Record.findByUserID.bind(Record);

//插入数据
module.exports.insert = function (recordFields, callback) {
    var record = new Record(recordFields);
    //检查数据格式
    Record.validateAndFormatError(record, function (error) {
        if (error) return callback(error, null);
        //录入数据
        record.save(callback);
    });
};

//查找全部
module.exports.findAll = function (callback) {
    //此类数据 返回格式包含列表和数量 用来处理后期分页问题
    async.parallel({
        total: Record.countAll.bind(Record),
        records: Record.findAll.bind(Record)
    }, function (error, args) {
        if (error) return callback(error, null);
        callback(
            null, 
            {
                meta: { count: args.total, length: args.records.length },
                list: args.records
            }
        );
    });
};
//修改
module.exports.update = function (record, updatedFields, callback) {
    for (var field in updatedFields)
        record[field] = updatedFields[field];

    Record.validateAndFormatError(record, function (error) {
        if (error) return callback(error, null);

        record.save(callback);
    });
};
