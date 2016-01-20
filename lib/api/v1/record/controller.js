'use strict';

var recordManager = require('./manager');

module.exports.getByID = recordManager.getByID;

module.exports.findByUserID = recordManager.findByUserID;

module.exports.insert = recordManager.insert;

module.exports.update = recordManager.update;