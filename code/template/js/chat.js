$('.btn').on('click', function() {
    var data = {
        flag: 'self',
        name: '我说',
        text: $('textarea').val()
    }
    var html = template('tpl', data);
    console.log(html);

    $('.messages').append(html);
    $.ajax({
        type: 'post',
        url: '../char.php',
        success: function(info) {
            // info 为服务器返回的数据  拼凑数据
            data = {
                flag: 'other',
                name: '对方说',
                text: info
            }

            // 调用模板引擎
            var html = template('tpl', data);

            // 将模板引擎替换好的html放到页面上
            $('.messages').append(html);
        }
    });
    $('textarea').val('');
});