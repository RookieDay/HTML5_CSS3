var $ = {
	params: function (params) {
		var data = '';
		// ƴ�ղ���
		for(key in params) {
			data += key + '=' + params[key] + '&';
		}

		// �����һ��&�ַ��ص�
		return data.slice(0, -1);
	},
	// Ajaxʵ��
	ajax: function (options) {
		// ʵ����XMLHttpRequest
		var xhr = new XMLHttpRequest,
			
			// Ĭ��Ϊget��ʽ
			type = options.type || 'get',
			// Ĭ������·��
			url = options.url || location.pathname,
			// ��ʽ������key1=value1&key2=value2
			data = this.params(options.data),

			callback = options.success;

		// get ��ʽ������ƴ�ӵ�URL�ϲ���data���ó�null
		if(type == 'get') {
			url = url + '?' + data;
			data = null;
		}

		xhr.open(type, url);

		// post ��ʽ��������ͷ
		if(type == 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		// ������������
		xhr.send(data);

		// ������Ӧ
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200) {
				// ��ȡ��Ӧ����
				var contentType = xhr.getResponseHeader('Content-Type');

				var data = xhr.responseText;

				// ����JSON
				if(contentType.indexOf('json') != -1) {
					data = JSON.parse(data);
				}
				
				// ����success
				// options.success(data);
				
				callback(data);
			} else {
				options.error('����ʧ��!');
			}
		}

	}
};