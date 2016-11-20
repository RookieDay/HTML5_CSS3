$('.submit').on('click', function() {
    var _this = $(this);
    if (_this.hasClass('disabled')) return;
    var formData = $('ajaxForm').serialize();
    $.ajax({
        type: 'post',
        url: 'register.php',
        data: formData,
        beforeSend: function() {
            if ($('.pass').val() == '') {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('用户名不能为空');
                return false;
            }
            _this.addClass('disabled');
            _this.val('正在提交....');
        },
        success: function(data) {

        },
        error: function() {},
        complete: function() {
            _this.removeClass('disabled');
            _this.val('立即注册');
        }
    });
});

$('.verify').on('click', function() {
    var _this = $(this);
    // is() 根据选择器、元素或 jQuery 对象来检测匹配元素集合，如果这些元素中至少有一个元素匹配给定的参数，则返回 true。
    if (_this.is('.diabled')) return;
    _this.addClass('disabled');
    var mobile = $('.mobild').val();
    $.ajax({
        type: 'post',
        url: 'getCode.php',
        data: { mobile: mobile },
        timeout: 2000,
        beforeSend: function() {
            var regMobil = /^(13[0-9]|14[57]|15[0-9]|18[0-9])\d{8}$/;
            if (!regMobil.test($('.mobile').val())) {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('手机格式不正确');
                return false;
            }
            var seconds = 10;
            var t = setInterval(function() {
                _this.val(--seconds + '秒后重新获取');
                if (seconds < 0) {
                    clearInterval(t);
                    _this.val('获取验证码').removeClass('disabled');
                }
            }, 1000);
        },
        success: function() {
            console.log('success');
        },
        error: function() {

        },
        complete: function() {
            console.log('complete');
        }
    });
});
$.ajaxSetup({
    timeout: 3000
})