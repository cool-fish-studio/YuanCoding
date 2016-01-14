'use strict';

var authManager = require('./manager');

module.exports.passportByGithub = function (req, res, next) {
    authManager.passportByGithub(req, res, function (error) {
        if (error) return next(error);
        res.redirect('/');
    });
};
module.exports.passportCallbackByGithub = function (req, res, next) {
    var userID = req.user.id;
    console.log(req.user);
    res.cookie('yuancoding_userID', userID, {expires: new Date(Date.now() + 86400000*30), httpOnly: true});
    res.redirect('/');
};