var $ = {
    params: function(params) {
        var data = '';
        for (var key in params) {
            data += key + '=' + params[key] + '&';
        }
        return data.slice(0, -1);
    },
    ajax: function(options) {
        var xhr = new XMLHttpRequest,
            type = options.type || 'get',
            url = options.url || location.pathname;
        data = this.params(options.data);
        callback = options.success;

        if (type == 'get') {
            url += '?' + data;
            data = null;
        }
        xhr.open(type, url);
        if (type == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var contentType = xhr.getResponseHeader('Content-Type');
                var data = xhr.responseText;
                if (contentType.indexOf('json') != -1) {
                    data = JSON.parse(data);
                }
                callback(data);
            } else {
                options.error('erros');
            }
        }
    }
}