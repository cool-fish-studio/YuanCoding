$(function () {
    //获取容器
    var editorPanel = $('#editorPanel').get(0);
    //获取容器宽高
    var w = $('#editorPanel').css('width');
    var h = $('#editorPanel').css('height');
    //设置编辑器
    var editor = CodeMirror.fromTextArea(editorPanel, {
        mode: 'text/html',
        theme: 'tomorrow-night-eighties',
        indentUnit: 4,
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true
    });
    //设置编辑器宽高
    editor.setSize(w, h);
    //设置编辑器自动换行
    editor.setOption('lineWrapping', true);

    //顶部菜单
    var isOpenMenu = false;
    //顶部菜单点击
    $('.menu-nav').delegate('.menu-board', 'click', function () {
        $('.menu-board').removeClass('active');
        $(this).addClass('active');
        isOpenMenu = true;
        return false;
    });
    //顶部菜单移入
    $('.menu-board').hover(function () {
        if (isOpenMenu) {
            $('.menu-board').removeClass('active');
            $(this).addClass('active');
            return false;
        }
    });
    //清除菜单
    $(document).click(function () {
        $('.menu-board').removeClass('active');
        isOpenMenu = false;
    });


    //左侧菜单
    $('#workspace').click(function () {
        if ($(this).hasClass('active')) {
            $('.leftSection').animate({ 
                left: '-215px'
            }, 200, function () {
                $('#workspace').removeClass('active');
                $('.leftSection').css({'display': 'none'});
                $('#workspaceContent').css({'display': 'none'});
            });
            $('.contentPanel').animate({ 
                left: '35px'
            }, 200);
            w = parseInt(w) + 251 + 'px';
            editor.setSize(w, h);
        } else {
            $(this).addClass('active');
            $('.leftSection').css({'display': 'block'});
            $('#workspaceContent').css({'display': 'block'});
            $('.leftSection').animate({ 
                left: '35px'
            }, 200);
            $('.contentPanel').animate({ 
                left: '286px'
            }, 200, function () {
                w = parseInt(w) - 251 + 'px';
                editor.setSize(w, h);
            });
        }
    });

    //右侧菜单
    $('.rightBar').delegate('.menuBtn', 'click', function () {
        if ($('.rightSection').css('display') === 'block' && !$(this).hasClass('active')) {
            $('.rightBar .menuBtn').removeClass('active');
            $(this).addClass('active');
            w = parseInt(w) + 250 + 'px';
            editor.setSize(w, h);
            $('.rightSection').animate({ 
                left: '35px'
            }, 200, function () {
                $(this).removeClass('active');
                $('.rightSectionContent').css({'display': 'none'});
                $('.rightSectionContent').eq($(this).index()).css({'display': 'block'});
                $('.rightSection').animate({ 
                    left: '-250px'
                }, 200, function () {
                    w = parseInt(w) - 250 + 'px';
                    editor.setSize(w, h);
                });
            });
        } else {
            if ($(this).hasClass('active')) {
                $('.rightBar .menuBtn').removeClass('active');
                $('.rightSection').animate({ 
                    left: '35px'
                }, 200, function () {
                    $(this).removeClass('active');
                    $('.rightSection').css({'display': 'none'});
                    $('.rightSectionContent').css({'display': 'none'});
                });
                w = parseInt(w) + 250 + 'px';
                editor.setSize(w, h);
            } else {
                $('.rightBar .menuBtn').removeClass('active');
                $(this).addClass('active');
                $('.rightSection').css({'display': 'block'});
                $('.rightSectionContent').css({'display': 'none'});
                $('.rightSectionContent').eq($(this).index()).css({'display': 'block'});
                $('.rightSection').animate({ 
                    left: '-250px'
                }, 200, function () {
                    w = parseInt(w) - 250 + 'px';
                    editor.setSize(w, h);
                });
            }
        }
    });


    //功能
    $('#saveBtn').click(function () {
        var data = {};
        data.codeID = util.getID();
        data.codeText = editor.getValue();
        data.title = '测试';

        var errorMsg = request.validator([
            {name: '项目名称', data: data.title, regexp: null, empty: true, msg: null}
        ]);
        NProgress.start();

        if (errorMsg) {
            console.log('errorMsg:', errorMsg);
            toastr.error('保存失败');
            NProgress.done();
        }
        request.saveCode(data, function (error, date) {
            console.log(data);
            NProgress.done();
        });
    });
});

// window.onload = function () {
    


    // var w = document.body.clientWidth;
    // var h = document.body.clientHeight;
    // var editorHeight = h - parseInt($('.header').css('height')) - parseInt($('.editorMenu').css('height'));
    // var delay = null;
    // var isPreview = true;
    // var codePanel = document.getElementById('editor');
    // var editor = CodeMirror.fromTextArea(codePanel, {
    //     mode: 'text/html',
    //     theme: 'tomorrow-night-eighties',
    //     indentUnit: 4,
    //     lineNumbers: true
    // });
    // editor.setSize(w / 2, editorHeight);
    // editor.setOption('lineWrapping', true);//自动换行
    // //监听事件
    // editor.on('change', function() {
    //     if (isPreview) {
    //         clearTimeout(delay);
    //         delay = setTimeout(updatePreview, 300);
    //     }
    // });


    // var w = document.body.clientWidth;
    // var h = document.body.clientHeight;
    // var editorHeight = h - parseInt($('.header').css('height')) - parseInt($('.editorMenu').css('height'));
    // var delay = null;
    // var isPreview = true;
    // var codePanel = document.getElementById('editor');
    // var editor = CodeMirror.fromTextArea(codePanel, {
    //     mode: 'text/html',
    //     theme: 'tomorrow-night-eighties',
    //     indentUnit: 4,
    //     lineNumbers: true
    // });
    // editor.setSize(w / 2, editorHeight);
    // editor.setOption('lineWrapping', true);//自动换行
    // //监听事件
    // editor.on('change', function() {
    //     if (isPreview) {
    //         clearTimeout(delay);
    //         delay = setTimeout(updatePreview, 300);
    //     }
    // });
    // initPreview();
    // updatePreview();
    // function updatePreview () {
    //     var previewFrame = document.getElementById('preview');
    //     var preview =  previewFrame.contentDocument || previewFrame.contentWindow.document;
    //     preview.open();
    //     preview.write(editor.getValue());
    //     preview.close();
    // }

    // function initPreview () {
    //     editor.setSize(w / 2);
    //     $('#preview').css({
    //         'width': w / 2,
    //         'height': editorHeight
    //     });
    //     $('#scroll').css({
    //         'left': w / 2 - 5 + 'px' 
    //     });
    // }

    // $(window).keydown(function (event) {
    //     //save
    //     if (event.keyCode === 83 && (event.ctrlKey === true || event.metaKey === true)) {
    //         save();
    //         return false;
    //     }
    // });
    // $('#saveBtn').click(function () {
    //     save();
    // });
    // $('#scroll').on('mousedown', function (ev) {
    //     var oEvent = ev || event;
    //     var oScroll = document.getElementById('scroll');
    //     var oEditor = document.getElementById('editor');
    //     var oPreView = document.getElementById('preview');
    //     var disX = oEvent.clientX - oScroll.offsetLeft;
    //     var sw = oScroll.offsetWidth;
    //     $('body').append('<div id="editor-drag-cover" style="display:block;"></div>');
    //     document.onmousemove = function (ev) {
    //         var oEvent = ev || event;
    //         var l = oEvent.clientX - disX;
    //         oEditor.style.width = l + 'px';
    //         oPreView.style.width = w - l + 'px';
    //         oScroll.style.left = l - sw / 2 + 'px';
    //         // editor.resize();
    //         editor.setSize(l);

    //     };
    //     document.onmouseup = function (ev) {
    //         document.onmousemove = null;
    //         document.onmouseup = null;
    //         $('#editor-drag-cover').remove();
    //     };
    //     return false;
    // });
    // $('#previewBtn').click(function () {
    //     if (isPreview) {
    //         isPreview = false;
    //         editor.setSize(w);
    //         $('#preview').css({
    //             'width': 0
    //         });
    //         $('#scroll').css({
    //             'display': 'none'
    //         });
    //     } else {
    //         isPreview = true;
    //         editor.setSize(w / 2);
    //         $('#preview').css({
    //             'width': w / 2
    //         });
    //         $('#scroll').css({
    //             'left': w / 2 - 5 + 'px',
    //             'display': 'block'
    //         });
    //         updatePreview();
    //     }
    // });
    // $('.alertCover #cannel').on('click', function () {
    //     $('.alertCover').hide();
    // });
    // $('.alertCover #submit').on('click', function () {
    //     $('#codeName').val($('.alertText').val());
    //     $('.alertCover').hide();
    //     save();
    // });
    // function save () {
    //     console.log($('#codeName').val());
    //     if ($('#codeName').val() === '') {
    //         $('.alertCover').show();
    //         return;
    //     }
    //     NProgress.start();
    //     $.ajax({
    //         type: 'POST',
    //         url: '/code/' + util.getID(),
    //         data: {
    //             codeText: editor.getValue(),
    //             title: $('#codeName').val()
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             NProgress.done();
    //             if (data._id !== util.getID()) {
    //                 window.location.pathname = '/code/' + data._id;
    //             }
    //         },
    //         error: function (errorMsg) {
    //             console.log('errorMsg:', errorMsg);
    //             toastr.error('保存失败');
    //             NProgress.done();
    //         }
    //     });
    // }
// };