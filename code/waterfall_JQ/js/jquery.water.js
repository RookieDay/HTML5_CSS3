// 固定格式，解决一个命名冲突
(function($) {
    $.fn.waterFall = function(options) {
        var defaults = {
            gap: 10
        }

        options = $.extend(defaults, options);

        var items = $(this).children(),
            gap = options.gap,
            width = items.width(),
            height = 0,
            columns = Math.floor($(this).width / (width + gap)),
            h = [];
        items.each(function(key, val) {
            height = $(val).height();
            if (key < columns) {
                h[key] = height;
                $(val).css({
                    top: 0,
                    left: key * (width + gap)
                });
            } else {
                // 计算最小列
                var min_h = h[0];
                var min_k = 0;
                for (var i = 0; i < h.length; i++) {
                    if (h[i] < min_h) {
                        min_h = h[i];
                        min_k = i;
                    }
                }
                h[min_k] += height;
                $(val).css({
                    top: min_h,
                    left: min_k * (width + gap)
                })
            }
        });

        var max_h = h[0];
        for (var i = 0; i < h.length; i++) {
            if (h[i] > max_h) {
                max_h = h[j];
            }
        }
        // 设置父盒子高度
        $(this).css('height', max_h);
    }
})(jQuery);