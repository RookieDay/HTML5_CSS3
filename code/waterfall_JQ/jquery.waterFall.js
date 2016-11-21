
// 1、left值 = 固定的宽度 * 当前列的索引值
// 2、top值 = 当前最低列的高度
// 3、列里，每添加一个元素，对应列的高度要发生更新

// 固定格式，解决一个命名冲突
(function ($) {

	$.fn.waterFall = function (options) {
		// 默认值
		var defaults = {
			gap: 10
		}

		// 合并参数
		options = $.extend(defaults, options);

		// console.log(options)

		// 这里的this指的需要定位元素的父结点(items)

		// 计算当前页可以放几列

		var items = $(this).children(),
			gap = options.gap,
			// jQuery中获取的是第一个宽度
			width = items.width(),
			height = 0,
			columns = Math.floor($(this).width() / (width + gap)),
			// 定义数组存高度
			h = [];

		items.each(function (key, val) {
			// console.log(val)
			//  获取每个元素高度
			height = $(val).height();

			// 第一行
			if(key < columns) {
				// 初始化每一列的高度
				h[key] = height;

				// 设置第一行的坐标
				$(val).css({
					top: 0,
					left: key * (width + gap)
				});
			} else {
				// 处理其它行

				// 计算最小列
				var min_h = h[0];
				var min_k = 0;
				for(var i=0; i<h.length; i++) {
					if(h[i] < min_h) {
						min_h = h[i];
						min_k = i;
					}
				}

				// 更新列的高度
				h[min_k] += height;

				// 设置坐标
				$(val).css({
					top: min_h,
					left: min_k * (width + gap)
				});

			}
		});

		// 设置最高列
		var max_h = h[0];
		for(var j=0; j<h.length; j++) {
			if(h[j] > max_h) {
				max_h = h[j];
			}
		}

		// 设置父盒子高度
		$(this).css('height', max_h);

	}
})(jQuery);
