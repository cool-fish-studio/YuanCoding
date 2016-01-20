'use strict';

var mongoose = require('../../util/db').mongoose;
var Schema = mongoose.Schema;

var errors = require('../../util/error').errors;
var helper = require('../../util/helper');

/**
 *  数据模型
 *
 *  名字，创建者ID，创建时间
 */
var RecordSchema = new Schema({   
        _id: { type: String, default: helper.generateUUID() },
        codeID: { type: String, required: true },
        status: { type: String, required: true },
        userID: { type: String, required: true },
        forkID: { type: String, required: true },
        title: { type: String, required: true },

        removed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    }, {
        collection: 'record',
        _id: false
    }
);

/**
 *  数据操作监听
 */
//数据格式校验
RecordSchema.static('validateAndFormatError', function (record, callback) {
    return record.validate(function (error)
    {
        callback(error);
    });
});
//根据id查找
RecordSchema.static('getByID', function (recordID, callback) {
    return this.findById(recordID, function (error, record)
    {
        if (error && 'CastError' === error.name && 'ObjectId' === error.kind)
            return callback(errors.record.invalid.id, null);
        if (error)
            return callback(error, null);

        callback(null, record);
    });
});
//根据用户id查找
RecordSchema.static('findByUserID', function (userID, queryOptions, callback) {
    var query = this.find({ createdByID: createdByID });

    if ('function' === typeof queryOptions) {
        callback = queryOptions;
        queryOptions = {};
    }

    if (undefined !== queryOptions.limit)
        query.limit(queryOptions.limit);
    if (undefined !== queryOptions.offset)
        query.skip(queryOptions.offset);

    query.exec(function (error, records) {
        if (error && 'CastError' === error.name && 'ObjectId' === error.kind)
            return callback(errors.content.createdByID.invalid(), null);
        if (error)
            return callback(error, null);

        callback(null, records);
    });
});
//查找全部
RecordSchema.static('findAll', function (queryOptions, callback) {
    var query = this.find({ removed: false }).sort({ 'weight': -1 });
    if ('function' === typeof queryOptions)
    {
        callback = queryOptions;
        queryOptions = {};
    }

    if (undefined !== queryOptions.limit)
        query.limit(queryOptions.limit);
    if (undefined !== queryOptions.offset)
        query.skip(queryOptions.offset);
    query.exec(callback);
});
//全部数量
RecordSchema.static('countAll', function (callback) {
    return this.count({ removed: false }, callback);
});
//保存
RecordSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
//处理 _id
RecordSchema.set('toJSON', { getters: true, virtuals: true, versionKey: false });
if (!RecordSchema.options.toJSON) RecordSchema.options.toJSON = {};
RecordSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret._id;
};

var Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
module.exports.schema = RecordSchema;