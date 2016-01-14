'use strict';

exports.generateUUID = function (length) {
    var id = '',
        length = length || 32;
    while (length--)
        id += (Math.random() * 16 | 0) % 2 ? (Math.random() * 16 | 0).toString(16) : (Math.random() * 16 | 0).toString(16).toUpperCase();
    return id.toLowerCase();
}