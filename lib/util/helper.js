'use strict';

var crypto = require('crypto');
var config = require('../../config');

exports.getObjectID = db.ObjectID;

exports.getMd5 = function (str) {
    if (!str) return '';
    var md5 = crypto.createHash('md5');
    var result = md5.update(str).digest('hex');
    return result;
};

exports.ran = function (n, m) {
    return Math.round( Math.random() * (m-n) + n );
};

exports.randomPassword = function (length, type) {
    var obj = {
        n : '1234567890',
        a : 'abcdefghizklmnopqrstuvwsyz',
        A : 'ABCDEFGHIZKLMNOPQRSTUVWSYZ',
        s : '~!@#$%^&*()_+;,./?<>'
    };
    var arr = [];
    var pw = '';
    if(type.indexOf( 'n' ) !== -1) arr.push(obj.n);
    if(type.indexOf( 'a' ) !== -1) arr.push(obj.a);
    if(type.indexOf( 'A' ) !== -1) arr.push(obj.A);
    if(type.indexOf( 's' ) !== -1) arr.push(obj.s);
    for (var i = 0; i < length; i++) {
        var j = exports.ran(0, arr.length - 1);
        var k = exports.ran(0, arr[j].length -1);
        pw += arr[j].charAt(k);
    }
    return pw;
};

module.exports.html2Escape = function (sHtml) {
    return sHtml.replace(/[<>&"]/g, 
        function (c)
        {
            return {
                '<':'&lt;', 
                '>':'&gt;', 
                '&':'&amp;', 
                '"':'&quot;'
            }[c];
        });
};

//日期格式化
module.exports.dateFormat = function (date, format) {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (date.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
    }
    for (var k in o)
    {
        if (new RegExp('(' + k + ')').test(format))
        {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                    (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return format;
};

module.exports.getTime = function (time) {
    var now = Date.now() - time;
    var str = '';
    if (now < 60000) str = (Math.round(now / 1000) <= 0 ? 1 : Math.round(now / 1000)) + '秒';
    if (now > 60000 && now < 3600000 ) str = Math.round(now / 60000) + '分钟';
    if (now > 3600000 && now < 86400000 ) str = Math.round(now / 3600000) + '小时';
    if (now > 86400000 && now < 2592000000 ) str = Math.round(now / 86400000) + '天';
    if (now > 2592000000 && now < 31536000000 ) str = Math.round(now / 2592000000) + '月';
    if (now > 31536000000) str = Math.round(now / 31536000000) + '年';

    return str;
};