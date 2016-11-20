// 封装一个函数
// 传统方式传参不方便
// 可以实现，不可取
// function ajax(type, url, data, callback) {
// 	var xhr = new XMLHttpRequest;
// }

var obj = {
    // url: '',
    type: 'get',
    data: {},
    callback: function() {}
}

// function ajax(obj) {
// 	var type = obj.type;
// 	var url = obj.url;
// }

// function ajax() {}

// function ajax() {}

// 自已写的
var tools = {
    ajax: function() {}
}

// 同事写的
var utils = {
    ajax: function() {}
}

tools.ajax();

utils.ajax();

// 1、命名空间 2、闭包


var $ = {
    // 将数据格式化处理key=val&key1=val1
    params: function(data) {
        // 遍历拼凑数据格式
        var d = '';
        for (var key in data) {
            d += key + '=' + data[key] + '&';
        }

        // 这步需要将最后多余的&去掉
        d = d.slice(0, -1);

        return d;
    },
    ajax: function(obj) {
        // console.log(obj.type);

        // 起到了一个默认值的作用
        var type = obj.type || 'get';
        // 默认值
        var url = obj.url || location.pathname;
        // 处理数据
        // data成为了key=val
        var data = this.params(obj.data);

        // 实例化
        var xhr = new XMLHttpRequest;

        // 当请求方式为get情况下，参数在url后
        if (type == 'get') {
            url = url + '?' + data;
            data = null;
        }

        // 请求行
        xhr.open(type, url);

        // 当请求方式为post时，需要设置一个Content-Type
        if (type == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        // 发送数据
        xhr.send(data);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // obj.callback(xhr.responseText);

                var ct = xhr.getResponseHeader('Content-Type');
                var data = xhr.responseText;

                // console.log(ct);
                // 检测ct里是否包含json字样
                if (ct.indexOf('json') != -1) {
                    // 只有返回结果的确为json格式时才能用
                    data = JSON.parse(data);
                }

                // 这里直接放到一个DOM元素里，比如p标签
                // 如是这种情况会产生一个结果，每次调用都将
                // 数据放到了p里，就达不到了函数的灵活性

                // 解决方式就是通过一个回调函数，比如success

                // 成功后执行回调并将服务器返回的结果传递过去
                obj.success(data);

            } else {
                // obj.error('请求错误！');
            }
        }
    }
}

// 调用工具函数
$.ajax({
    type: 'post',
    url: 'stars.php',
    // 以对象形式传递数据会更加方便
    data: { name: 'itcast', age: 10 },
    success: function(data) {
        console.log(data);
    },
    error: function(err) {
        console.log(err);
    }
});

// 达到灵活性
$.ajax({
    type: 'post',
    url: 'stars.php',
    // 以对象形式传递数据会更加方便
    data: { name: 'itcast', age: 10 },
    success: function(data) {
        // console.log(data);
        alert(data);
    },
    error: function(err) {
        console.log(err);
    }
});


// var str = 'location hello ajax';

// alert(str.indexOf('ajax1'));		


// location 关于地址相关信息
// for(var key in location) {
// 	console.log(key + '~~~' + location[key]);
// }

// host 当前主机
// hash 锚点
// search 请求的参数
// href 当前路径 可读可写
// reload 刷新页面 location.reload(true); 强制刷新
// pathname 去掉主机的部分

// 页面跳转
// location.href = 'http://www.baidu.com';