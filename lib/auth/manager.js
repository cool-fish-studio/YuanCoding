'use strict';

var passport = require('passport'),
    GithubStrategy = require('passport-github').Strategy,
    config = require('../../config'),
    userManager = require('../user/manager');

module.exports.passportByGithub = function (req, res, next) {
    var callbackURL = config.HOST + '/auth/by/github' + (req.query.code ? '/' + req.query.code : '');
    passport.authenticate('github', {callbackURL: callbackURL, successRedirect: callbackURL, failureRedirect: '/'})(req, res, next);
};

//passport设置
passport.use(new GithubStrategy({
    clientID: config.PASSPORT.GITHUB.CLIENTID,
    clientSecret: config.PASSPORT.GITHUB.CLIENTSECRET
}, function (accessToken, refreshToken, profile, done) {
    if(!accessToken || !profile.id) return done(new Error());
    var userFields = {
        username: profile._json.name,
        email: profile._json.email,
        avatarUrl: profile._json.avatar_url,
        htmlUrl: profile._json.html_url,
        source: 'github'
    };
    userManager.getUserByMail(userFields.email, function (error, user) {
        if (error) return done(error);
        if (user) return done(null, user);
        userManager.insert(userFields, function (error, user) {
            if (error) return done(error);
            done(null, userFields);
        });
    });
}));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});