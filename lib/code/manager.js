'use strict';

var mongoCode = require('./model');

module.exports.insert = function (data, callback) {
	var fields = {
		codeText: ''
	};
	mongoCode.insert();
}

module.exports.update = mongoCode.update;

module.exports.remove = mongoCode.remove;

module.exports.getByID = mongoCode.getByID;

module.exports.findAll = mongoCode.findAll;

module.exports.count = mongoCode.count;