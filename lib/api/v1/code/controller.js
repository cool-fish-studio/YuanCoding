'use strict';

var codeManager = require('./manager');

module.exports.getByID = codeManager.getByID;

module.exports.findByCreatedByID = codeManager.findByCreatedByID;

module.exports.getByEmail = codeManager.getByEmail;

module.exports.insert = codeManager.insert;