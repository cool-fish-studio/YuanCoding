'use strict';

var userManager = require('./manager');

module.exports.getByID = userManager.getByID;

module.exports.getByEmail = userManager.getByEmail;

module.exports.insert = userManager.insert;