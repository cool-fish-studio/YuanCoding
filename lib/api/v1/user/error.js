'use strict';

var errorHelper = require('../../util/error');

module.exports = {
    not: {
        found: errorHelper.generate(400, 10101, 'User is not found in the database.'),
    },
    invalid: {
        id: errorHelper.generate(400, 10102, 'Invalid user id.'),
        email: errorHelper.generate(400, 10103, 'Invalid user email.'),
        password: errorHelper.generate(400, 10107, 'Invalid password.'),
        username: errorHelper.generate(400, 10110, 'Invalid username.'),
    }
};