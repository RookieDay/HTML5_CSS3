var $ = {
    params: function(data) {
        var d = '';
        for (var k in data) {
            d += key + '=' + data[key] + '&';
        }
        d = d.slice(0, -1);
        return d;
    },
    ajax: function(obj) {
        var type = obj.type || 'get';
        var url = obj.url || location.pathname;
        var data = this.params(obj.data);

        var xhr = new XMLHttpRequest;
        if (type == 'get') {
            url = url + '?' + data;
            data = null;
        }
        xhr.open(type, url);
        if (type == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var ct = xhr.getResponseHeader('Content-Type');
                var data = xhr.reponseText;
                if (ct.indexOf('json') != -1) {
                    data = JSON.parse(data);
                }
                obj.success(data);
            } else {
                obj.error('error');
            }
        }
    }
}

$.ajax({
    type: 'post',
    url: 'stars.php',
    data: { name: 'itcast', age: 10 },
    success: function(data) {
        console.log(data);
    },
    error: function(err) {
        console.log(err);
    }
});