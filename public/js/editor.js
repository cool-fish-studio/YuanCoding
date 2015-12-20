window.onload = function () {
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var editorHeight = h - parseInt($('.header').css('height')) - parseInt($('.editorMenu').css('height'));
    var delay = null;
    var isPreview = true;
    var codePanel = document.getElementById('editor');
    var editor = CodeMirror.fromTextArea(codePanel, {
        mode: 'text/html',
        theme: 'tomorrow-night-eighties',
        indentUnit: 4,
        lineNumbers: true
    });
    editor.setSize(w / 2, editorHeight);
    editor.setOption('lineWrapping', true);//自动换行
    //监听事件
    editor.on('change', function() {
        if (isPreview) {
            clearTimeout(delay);
            delay = setTimeout(updatePreview, 300);
        }
    });
    initPreview();
    updatePreview();
    function updatePreview () {
        var previewFrame = document.getElementById('preview');
        var preview =  previewFrame.contentDocument || previewFrame.contentWindow.document;
        preview.open();
        preview.write(editor.getValue());
        preview.close();
    }

    function initPreview () {
        editor.setSize(w / 2);
        $('#preview').css({
            'width': w / 2,
            'height': editorHeight
        });
        $('#scroll').css({
            'left': w / 2 - 5 + 'px' 
        });
    }

    $(window).keydown(function (event) {
        //save
        if (event.keyCode === 83 && (event.ctrlKey === true || event.metaKey === true)) {
            save();
            return false;
        }
    });
    $('#saveBtn').click(function () {
        save();
    });
    $('#scroll').on('mousedown', function (ev) {
        var oEvent = ev || event;
        var oScroll = document.getElementById('scroll');
        var oEditor = document.getElementById('editor');
        var oPreView = document.getElementById('preview');
        var disX = oEvent.clientX - oScroll.offsetLeft;
        var sw = oScroll.offsetWidth;
        $('body').append('<div id="editor-drag-cover" style="display:block;"></div>');
        document.onmousemove = function (ev) {
            var oEvent = ev || event;
            var l = oEvent.clientX - disX;
            oEditor.style.width = l + 'px';
            oPreView.style.width = w - l + 'px';
            oScroll.style.left = l - sw / 2 + 'px';
            // editor.resize();
            editor.setSize(l);

        };
        document.onmouseup = function (ev) {
            document.onmousemove = null;
            document.onmouseup = null;
            $('#editor-drag-cover').remove();
        };
        return false;
    });
    $('#previewBtn').click(function () {
        if (isPreview) {
            isPreview = false;
            editor.setSize(w);
            $('#preview').css({
                'width': 0
            });
            $('#scroll').css({
                'display': 'none'
            });
        } else {
            isPreview = true;
            editor.setSize(w / 2);
            $('#preview').css({
                'width': w / 2
            });
            $('#scroll').css({
                'left': w / 2 - 5 + 'px',
                'display': 'block'
            });
            updatePreview();
        }
    });
    $('.alertCover #cannel').on('click', function () {
        $('.alertCover').hide();
    });
    $('.alertCover #submit').on('click', function () {
        $('#codeName').val($('.alertText').val());
        $('.alertCover').hide();
        save();
    });
    function save () {
        console.log($('#codeName').val());
        if ($('#codeName').val() === '') {
            $('.alertCover').show();
            return;
        }
        NProgress.start();
        $.ajax({
            type: 'POST',
            url: '/code/' + util.getID(),
            data: {
                codeText: editor.getValue(),
                title: $('#codeName').val()
            },
            success: function (data) {
                console.log(data);
                NProgress.done();
                if (data._id !== util.getID()) {
                    window.location.pathname = '/code/' + data._id;
                }
            },
            error: function (errorMsg) {
                console.log('errorMsg:', errorMsg);
                toastr.error('保存失败');
                NProgress.done();
            }
        });
    }
};