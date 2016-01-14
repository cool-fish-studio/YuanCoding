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
var CodeSchema = new Schema({   
        _id: { type: String, default: helper.generateUUID() },
        title: { type: String, required: true },
        codeText: { type: String, required: true },
        createdByID: { type: Schema.Types.ObjectId, required: true },

        removed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    }, {
        collection: 'code',
        _id: false
    }
);

/**
 *  数据操作监听
 */
//数据格式校验
CodeSchema.static('validateAndFormatError', function (code, callback) {
    return code.validate(function (error)
    {
        callback(error);
    });
});
//根据id查找
CodeSchema.static('getByID', function (codeID, callback) {
    return this.findById(codeID, function (error, code)
    {
        if (error && 'CastError' === error.name && 'ObjectId' === error.kind)
            return callback(errors.code.invalid.id, null);
        if (error)
            return callback(error, null);

        callback(null, code);
    });
});
//根据用户id查找
CodeSchema.static('findByCreatedByID', function (createdByID, queryOptions, callback) {
    var query = this.find({ createdByID: createdByID });

    if ('function' === typeof queryOptions) {
        callback = queryOptions;
        queryOptions = {};
    }

    if (undefined !== queryOptions.limit)
        query.limit(queryOptions.limit);
    if (undefined !== queryOptions.offset)
        query.skip(queryOptions.offset);

    query.exec(function (error, codes) {
        if (error && 'CastError' === error.name && 'ObjectId' === error.kind)
            return callback(errors.content.createdByID.invalid(), null);
        if (error)
            return callback(error, null);

        callback(null, codes);
    });
});
//查找全部
CodeSchema.static('findAll', function (queryOptions, callback) {
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
CodeSchema.static('countAll', function (callback) {
    return this.count({ removed: false }, callback);
});
//保存
CodeSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
//处理 _id
CodeSchema.set('toJSON', { getters: true, virtuals: true, versionKey: false });
if (!CodeSchema.options.toJSON) CodeSchema.options.toJSON = {};
CodeSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret._id;
};

var Code = mongoose.model('Code', CodeSchema);

module.exports = Code;
module.exports.schema = CodeSchema;