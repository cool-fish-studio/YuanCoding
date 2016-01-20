var request = {
    validator: function (arrRegexp) {
        //arrRegexp ==> {'regexp': /123/, data: '123123123', msg: '1236263871'}
        for (var i = 0, length = arrRegexp.length; i < length; i++) {
            if (!arrRegexp[i].empty) {
                return arrRegexp[i].name + '不能为空';
            }
            if (arrRegexp[i].regexp.test(arrRegexp[i].data)) {
                return arrRegexp[i].msg;
            }
        }
    },
    //保存代码
    saveCode: function (data, callback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: '/code/' + data.codeID,
            data: {
                codeText: data.codeText,
                title: data.title
            },
            success: callback,
            error: errorCallback
        });
    }
};