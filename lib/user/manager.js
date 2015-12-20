'use strict';

var mongoUser = require('./model');

module.exports.insert = function (data, callback) {
	var fields = {
		codeText: ''
	};
	mongoUser.insert();
}

module.exports.update = mongoUser.update;

module.exports.remove = mongoUser.remove;

module.exports.getByID = mongoUser.getByID;

module.exports.findAll = mongoUser.findAll;

module.exports.count = mongoUser.count;

module.exports.getUserByMail = mongoUser.getUserByMail;

module.exports.updateUserByMail = mongoUser.updateUserByMail;