'use strict';

//添加
module.exports.home = function (req, res, next)
{
    res.render('index', { title: 'Express' });
};
