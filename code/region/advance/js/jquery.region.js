// 对象方法 $.fn.waterFall = function () {}
// 全局函数 $.each()

!(function($) {
    $.Region = function(options) {
        if (!options) return;
        //init
        var params = options.params || [],
            url = options.url || location.pathname,
            region = null,
            // map中的值要和region.json中的省/市/区县key保持一致
            map = ['p', 'c', 'd'];
        (function() {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    if (!data) return;
                    // 本地缓存数据
                    region = data;
                },
                error: function() {
                    console.log('region error');
                }
            })
        })();
        var t = setInterval(function() {
            if (!region) return;
            clearInterval(t);
            var options = [];

            for (var i = 0; i < params.length; i++) {
                var tmp = params[i].split('|');
                var o = {};
                o['el'] = tmp[0];
                o['id'] = tmp[1];
                o['pid'] = '000000';
                o['map'] = map[i];
                if (i > 0) {
                    o['pid'] = params[i - 1].split('|')[1];
                }
                options.push(o);
            }
        }, 200);
    }
})(jQuery);