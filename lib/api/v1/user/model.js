'use strict';

var mongoose = require('../../util/db').mongoose;
var Schema = mongoose.Schema;

var errors = require('../../util/error').errors;
var CONST = require('../../util/const');
var helper = require('../../util/helper');

/**
 *  数据模型
 *
 *  名字，创建者ID，创建时间
 */
var UserSchema = new Schema({
        _id: { type: String, default: helper.generateUUID() },
        email: { 
            type: String, 
            required: true,
            match: [
                /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                'Invalid email'
            ]
        },//账户即邮箱
        username: { type: String, required: true },//用户名
        avatarUrl: { type: String, required: true },
        htmlUrl: { type:String, default: '' },
        source: { type: String, default: 'user', enum: CONST.CONTENT_SOURCE_TYPES },
        createdAt: { type: Date, default: Date.now }
    }, {
        collection: 'user',
        _id: false
    }
);

/**
 *  数据操作监听
 */
//数据格式校验
UserSchema.static('validateAndFormatError', function (user, callback) {
    return user.validate(function (error) {
        callback(error);
    });
});
/**
 * getByID
 */
UserSchema.static('getByID', function (userID, callback) {
    if (!userID) return callback(errors.user.invalid.id, null);
    return this.findById(userID, function (error, user) {
        if (error && 'CastError' === error.name && 'ObjectId' === error.kind)
            return callback(errors.user.invalid.id, null);
        if (error)
            return callback(error, null);

        callback(null, user);
    });
});
/**
 * getByEmail
 */
UserSchema.static('getByEmail', function (email, callback) {
    if (!email) return callback(errors.user.invalid.email, null);
    return this.findOne({ email: email }, callback);
});
/**
 * getByUsername
 */
UserSchema.static('getByUsername', function (username, callback) {
    if (!username) return callback(errors.user.invalid.username, null);
    return this.findOne({ username: username }, callback);
});
//查找全部
UserSchema.static('findAll', function (queryOptions, callback) {
    var query = this.find({ removed: false }).sort({ 'weight': -1 });
    if ('function' === typeof queryOptions) {
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
UserSchema.static('countAll', function (callback) {
    return this.count({ removed: false }, callback);
});
//保存
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
//处理 _id
UserSchema.set('toJSON', { getters: true, virtuals: true, versionKey: false });
if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret._id;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.schema = UserSchema;