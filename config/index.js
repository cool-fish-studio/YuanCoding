'use strict';

var log = require('log4js').getLogger('config');

try {
    module.exports = require('./config_current.js');
} catch (err) {
    log.error('ERROR: Config file doesn\'t exist or incorrect');
    process.exit(1);
}
