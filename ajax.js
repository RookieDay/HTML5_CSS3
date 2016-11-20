var $ = {
	params: function (params) {
		var data = '';
		// 拼凑参数
		for(key in params) {
			data += key + '=' + params[key] + '&';
		}

		// 将最后一个&字符截掉
		return data.slice(0, -1);
	},
	// Ajax实例
	ajax: function (options) {
		// 实例化XMLHttpRequest
		var xhr = new XMLHttpRequest,
			
			// 默认为get方式
			type = options.type || 'get',
			// 默认请求路径
			url = options.url || location.pathname,
			// 格式化数据key1=value1&key2=value2
			data = this.params(options.data),

			callback = options.success;

		// get 方式将参数拼接到URL上并将data设置成null
		if(type == 'get') {
			url = url + '?' + data;
			data = null;
		}

		xhr.open(type, url);

		// post 方式设置请求头
		if(type == 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		// 发送请求主体
		xhr.send(data);

		// 监听响应
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200) {
				// 获取响应类型
				var contentType = xhr.getResponseHeader('Content-Type');

				var data = xhr.responseText;

				// 解析JSON
				if(contentType.indexOf('json') != -1) {
					data = JSON.parse(data);
				}
				
				// 调用success
				// options.success(data);
				
				callback(data);
			} else {
				options.error('请求失败!');
			}
		}

	}
};