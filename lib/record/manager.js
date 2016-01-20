'use strict';

var async = require('async');
var Record = require('./model');
var helper = require('../util/helper');
var userManager = require('../user/manager');

module.exports.insert = function (data, callback) {
    if(!data.codeID || !data.userID || !data.title || !data.status) {
        return callback('参数不足');
    }
    var fields = {
        _id: helper.generateUUID(),
        codeID: data.codeID, 
        userID: data.userID, 
        status: data.status,
        title: data.title
    };
    if (data.forkID) {
        fields.forkID = data.forkID;
    }
    Record.insert(fields, callback);

}

module.exports.findAll = function (pageNum, page, callback) {
    Record.findAll(pageNum, page, function (error, records) {
        async.forEach(records, function (item, done) {
            userManager.getByID(item.userID, function (error, user) {
                if (error) return done(error);
                item.created = helper.getTime(item.createAt) + '前';
                if (!user) {
                    item.userName = '游客[' + item.userID.substr(item.userID.length - 4).toUpperCase() + ']';
                    done(null);
                } else {
                    item.userName = user.name;
                    done(null);
                }
            });
        }, function (error) {
            if (error) return callback(error);
            callback(null, records);
        });
    });
};

module.exports.count = Record.count;