$('.btn').on('click', function() {
    $.ajax({
        type: 'post',
        url: 'jquery.php',
        data: { text: $(".text").val() },
        success: function(data) {
            // 服务器返回的data数据
            $('p').html(data);
        },
        error: function() {}
    })
});

// 快捷方式
$('.btn').click(function() {});

$('.btn').on('click', function() {});
$('.btn').on('focus', function() {});

// 只能用于get方式
$.get();

// 只能用于post
$.post();

// 可以通过参数设置请求方式
$.ajax();