'use strict';

var User = require('./model');

module.exports.insert = User.insert;

// module.exports.update = User.update;

// module.exports.remove = User.remove;

module.exports.getByID = User.getByID;

// module.exports.findAll = User.findAll;

// module.exports.count = User.count;

module.exports.getUserByMail = User.getUserByMail;

// module.exports.updateUserByMail = User.updateUserByMail;