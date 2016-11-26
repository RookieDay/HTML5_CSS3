搭建HTTP服务
安装wampserver

注意事项：
    1、检查网络是不是通的 ping 对方IP
    2、检查防火墙是否开启，如果开启将不能正常被访问
    3、检查访问权限 Allow from all
    4、理解默认索引
    5、确保端口没有被其它程序占用
    6、“#”表示注释
    7、修改配置要格外小心，禁止无意修改其它内容
将我们制作好的网页拷贝到配置好的根目录下，浏览器访问127.0.0.1即可
或者修改配置文件bin\apache\Apache2.2.21\conf\httpd.conf 
    设定根目录 DocumentRoot
    配置根目录 <Directory 之后重启服务

配置虚拟主机
在一台Web服务器上，我们可以通过配置虚拟主机，然后分别设定根目录，实现对多个网站的管理。
具体步骤如下：
    1、开启虚拟主机辅配置，在httpd.conf 中找到 
        #Virtual hosts 
        #Include conf/extra/httpd-vhosts.conf
        去掉前面的#号注释，开启虚拟主机配置
    2、 配置虚拟主机，打开conf/extra/httpd-vhosts.conf 
        分别修改以下三项
        DocumentRoot "E:/www/example"
        ServerName "example.com "
        ServerAlias "www.example.com"
        其它项无需指定。
    3、修改DNS（hosts）文件  注：修改hosts文件权限
        打开C:\Windows\System32\drivers\etc\hosts
        目录是固定的
    4、重启Apache
    5、浏览器访问www.example.com

PHP:
表单处理
    表单name属性的是用来提供给服务端接收所传递数据而设置的
    表单action属性设置接收数据的处理程序
    表单method属性设置发送数据的方式
    当上传文件是需要设置 enctype="multipart/form-data"，且只能post方式
    $_GET接收 get 传值
    $_POST接收 post 传值
    $_FILES接收文件上传
常用PHP函数
    in_array() 是否在数组中
    count() 计算数组长度
    array_key_exists ()检测数组中是否存在key
    file_get_contents读取文件
    ...还有很多

请求行 由请求方式、请求URL和协议版本构成
请求头
    Host：localhost请求的主机
    Cache-Control：max-age=0控制缓存
    Accept：*/* 接受的文档MIME类型
    User-Agent：很重要
    Referer：从哪个URL跳转过来的
    Accept-Encoding：可接受的压缩格式
    If-None-Match：记录服务器响应的ETag值，用于控制缓存
    此值是由服务器自动生成的
    If-Modified-Since：记录服务器响应的Last-Modified值
    此值是由服务器自动生成的
请求主体
    即传递给服务端的数据
    注：当以post形式提交表单的时候，请求头里会设置
    Content-Type: application/x-www-form-urlencoded，以get形式当不需要

响应/响应报文
    响应由服务器发出，其规范格式为：状态行、响应头、响应主体。
状态行 由协议版本号、状态码和状态信息构成
响应头
    Date：响应时间
    Server：服务器信息
    Last-Modified：资源最后修改时间
    由服务器自动生成
    ETag：资源修改后生成的唯一标识
    由服务器自动生成
    Content-Length：响应主体长度
    Content-Type：响应资源的MIME类型
MIME是标识文件类型的，文件后缀并不能正确无误的标识文件的类型。
    思考？客户端与服务器间传递数据时，是以什么形式传输的？
    客户端与服务器在进行数据传输的时候都是以字节形式进行的，咱们可以理解成是以文本形式传输，这时浏览器就需要明确知道该怎么样来解析这些文本形式的数据，MIME就是明确告知浏览器该如何来处理。
响应主体
    即服务端返回给客户端的内容；
状态码
常见的有200代表成功、304文档未修改、403没有权限、404未找到、500服务器错误

协商缓存（性能优化）
    此知识点属性扩展内容，不做具体分析
    前端优化雅虎35条
    http://www.tuicool.com/articles/J3uyaa
    重绘&回流
    http://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/
    利用浏览器的缓存机制，可以有效的减少HTTP的请求，提高页面加载速度，增强用户体验，同时也能极大的减轻服务器的负担，结合HTTP协议，缓存协商就是根据HTTP协议实现缓存控制的一种机制。
    问题：是否见过某些网站CSS地址后面会带有一些参数，通常为xxx.css?cache=20160106形式
    这种做法是用来强制清除缓存的，实际开发过程中，每当新功能上线时最容易引起BUG的即CSS的缓存，但是浏览器的缓存能减少请求，如果每次都强制清除，会对性能有损失，所以控制浏览器缓存成为前端性能化的一个重点
        1、Last-Modified时间精确到了秒，但如果1秒内修改了多次，并不能精确的更新缓存。
        2、ETag则是判断文件内容任何改变后，便会由服务器自动生成一个唯一标识。
        3、Expires 过期时间，HTTP1.0的规范，一个绝对的时间
        4、Cache-Control HTTP1.1规范，设置过期时间，优先级高于Expires。

我们需要检测并判断响应头的MIME类型后确定使用request.responseText或者request.responseXML


API详解
    xhr.open() 发起请求，可以是get、post方式
    xhr.setRequestHeader() 设置请求头
    xhr.send() 发送请求主体get方式使用xhr.send(null)
    xhr.onreadystatechange = function () {} 监听响应状态
    xhr.readyState = 0时，UNSENT open尚未调用
    xhr.readyState = 1时，OPENED open已调用
    xhr.readyState = 2时，HEADERS_RECEIVED 接收到头信息
    xhr.readyState = 3时，LOADING 接收到响应主体
    xhr.readyState = 4时，DONE 响应完成
    不用记忆状态，只需要了解有状态变化这个概念
    xhr.status表示响应码，如200
    xhr.statusText表示响应信息，如OK
    xhr.getAllResponseHeaders() 获取全部响应头信息
    xhr.getResponseHeader('key') 获取指定头信息
    xhr.responseText、xhr.responseXML都表示响应主体
注：GET和POST请求方式的差异（面试题）
    1、GET没有请求主体，使用xhr.send(null)
    2、GET可以通过在请求URL上添加请求参数
    3、POST可以通过xhr.send('name=itcast&age=10')
    4、POST需要设置 xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    5、GET效率更好（应用多）
    6、GET大小限制约4K，POST则没有限制

兼容性
IE5、IE6中使用 ActiveObject("Microsoft.XMLHTTP")
var request ;
if(XMLHTTPRequest) {
    request = new XMLHTTPRequest;
} else {
    request = new ActiveObject("Microsoft.XMLHTTP");
}


封装AJAX工具函数
    为了提升我们的开发效率，我们自已将XMLHttpRequest封装成一个函数。
jQuery中的Ajax
    jQuery为我们提供了更强大的Ajax封装
    $.ajax({}) 可配置方式发起Ajax请求
    $.get() 以GET方式发起Ajax请求
    $.post() 以POST方式发起Ajax请求
    $('form').serialize() 序列化表单（即格式化key=val&key=val）
    url 接口地址
    type 请求方式
    timeout 请求超时
    dataType 服务器返回格式
    data 发送请求数据
    beforeSend: function () {} 请求发起前调用
    success 成功响应后调用
    error 错误响应时调用
    complete 响应完成时调用（包括成功和失败）
jQuery Ajax介绍
    http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp
接口化开发
请求地址即所谓的接口，通常我们所说的接口化开发，其实是指一个接口对应一个功能，并且严格约束了请求参数和响应结果的格式，这样前后端在开发过程中，可以减少不必要的讨论，从而并行开发，可以极大的提升开发效率，另外一个好处，当网站进行改版后，服务端接口只需要进行微调。


模板引擎
原理剖析
    其本质是利用正则表达式，替换模板当中预先定义好的标签。
    正则表达式exec用法
    http://www.w3school.com.cn/jsref/jsref_exec_regexp.asp

流行模板引擎
    BaiduTemplate：http://tangram.baidu.com/BaiduTemplate/
    ArtTemplate：https://github.com/aui/artTemplate
    velocity.js：https://github.com/shepherdwind/velocity.js/
    Handlebars：http://handlebarsjs.com/
    http://blog.jobbole.com/56689/
artTemplate
    1、引入template-native.js
    2、<% 与  %> 符号包裹起来的语句则为模板的逻辑表达式
    3、<%= content %>为输出表达式

同源&跨域
同源
    同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。
跨域 不同源则跨域
例如http://www.example.com/

    http://api.example.com/detail.html	        不同源	域名不同
    https//www.example.com/detail.html	        不同源	协议不同
    http://www.example.com:8080/detail.html	    不同源	端口不同
    http://api.example.com:8080/detail.html	    不同源	域名、端口不同
    https://api.example.com/detail.html	        不同源	协议、域名不同
    https://www.example.com:8080/detail.html	不同源	端口、协议不同
    http://www.example.com/detail/index.html	同源	只是目录不同


跨域方案
    1、顶级域名相同的可以通过domain.name来解决，即同时设置 domain.name = 顶级域名（如example.com）
    2、document.domain + iframe
    3、window.name + iframe
    4、location.hash + iframe
    5、window.postMessage()
    参考资料
    http://rickgray.me/2015/09/03/solutions-to-cross-domain-in-browser.html
JSONP JSON with Padding
1、原理剖析
    其本质是利用了<script src=""></script>标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。
    只能以GET方式请求
jQuery中的JSONP
    jQuery 的$.ajax() 方法当中集成了JSONP的实现，可以非常方便的实现跨域数据的访问。
    dataType: 'jsonp' 设置dataType值为jsonp即开启跨域访问
    jsonp 可以指定服务端接收的参数的“key”值，默认为callback
    jsonpCallback 可以指定相应的回调函数，默认自动生成


/**
    * 连接符
    * Javascript中用+号表示连接符
    * PHP中使用.点号
    */
	$hello = 'hello';
	$world = 'world';

	echo $hello . $world;   helloworld

	// 输出的是详细信息
	var_dump($hello);       string 'hello' (length=5)


    $arr = array('name'=>'itcast'); 
	// 一般场景是用来设试代码使用
	var_dump($arr);  array   'name' => string 'itcast' (length=6)


/**
	 * 分支控制语句、循环语句
	 * 与Javascript一样
	 * foreach 数组遍历函数，类似Javascript中的 for in
	 */

	// var arr = [1, 2, 3, 4];
	// for(var i=0; i<arr.length; i++) {console.log(arr[i]);}

	// 索引数组
	// $arr = array(1, 2, 3, 4, 5, 6);

	// echo count($arr);
	// 需要获取数组长度，count($arr);
	// for($i=0; $i<count($arr); $i++) {
	// 	echo $arr[$i];
	// }

	// 关联数组
	// $arr = array('name'=>'itcast', 'age'=>10);

	// 用来遍历数组的
	// foreach($arr as $key=>$val) {
	// 	// echo $key;
	// 	echo $val;
	// }

	// var obj = {name: 'itcast', age: 10}
	// for(var key in obj) {console.log(obj[key])}

	// $arr = array(1, 2, 3, 4, 5, 6);

	// foreach($arr as $a=>$b) {
	// 	// echo $a;
	// 	echo $b;
	// }

	// 实际开发中用foreach来遍历数组

	// 单/双引号号
	$str = 'hello';

	// 双引号可以解析变量
	// echo "$str world";  hello world

	// 单引号不会解析变量，会当字符串处理
	echo '$str world';

	echo $str . 'world!';



 var xhr = new XMLHttpRequest;
// var xhr = new XMLHttpRequest;
xhr.open('get', '02.php?name=itcast&age=10');
// xhr.open('get','o2.php?name=itcast&age=10')
// 当post形式必须要写请求头Content-Type，并且只能是application/x-www-form-urlencoded

// 当以get形式情况下可以不写Content-Type
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

// POST数据放到请求主体中，但是不是必须要填写的
xhr.send(null);

// 监听响应状态
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
}


		var obj = '{"name": "itcast","age": 10}';
		// JSON是一个内建对象
		// 将字符串转成JS对象
		obj = JSON.parse(obj);   Object {name: "itcast", age: 10}

       var objs = {"name": "itcast","age": 10};
	   objs = JSON.stringify(obj);     "{"name":"itcast","age":10}"


 	// $obj = '{"name": "itcast", "age": 10}';
	// echo $obj;
	// 解码JSON
	// json_decode();
	// var_dump(json_decode($obj));
	// 编码JSON
	// json_endcode();


	// 指定文档类型
	// 可以不指定
	header('Content-Type:application/json; charset=utf-8');

	// 1、PHP连接数据库、读取数据
	// 2、一般情况下会将读取的数据转成数组
	// 3、需要通过json_encode() 来转成json
	// 4、可以将json数据echo，返回给js 或其它语言

	$result = file_get_contents('stars.json');

	echo $result;

封装自已的Ajax库
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


box-sizing: border-box; 代表计算宽高的时候会把boder 加上等于你现在样式里面设计的width

<script src="./js/jquery.min.js"></script>
<script>

    var obj = {
        name: 'itcast',
        age: 10
    }

    var opt = {
        name: 'web',
        age: 15,
        sex: '男'
    }

    // 合并两个对象，后面的 有则替换 无则添加
    console.log($.extend(obj, opt));
</script>


简单插件开发：
<p>我是一个文字</p>

<script src="./js/jquery.min.js"></script>
<script>

    console.log($.fn);

    // $('p').addClass();

    $.fn.test = function () {
        console.log(this);
    }

    $('p').test();

    // 1、自已可以往$.fn上面添加一个自定义的方法
    // 2、当我们在这个方法引用this，this指向的是当前DOM对象
    // 3、调用的时候和普通的方法一样

    // 换颜色
    $.fn.setColor = function (color) {
        $(this).css('color', color);
    }

    $('p').click(function () {
        $(this).setColor('blue');
    });

</script>


封装的JQ插件：
;(function ($) {
	$.fn.waterFall = function (options) {

		// 默认值及参数
		var defalut = $.extend({
			gap: 20
		}, options);

		// 初始化
		var _this = $(this),
			items = _this.children(),
			width = items.width(),
			height = 0,
			// 计算可以放置几列
			count = Math.floor(_this.width() / (width + defalut.gap)),
			columns = [];

		items.each(function (key, val) {
			// 每个元素的高度
			height = $(val).height();

			// 第一行
			if(key < count) {
				// 每一列的高度
				columns[key] = height;

				// 设置定位坐标
				$(val).css({
					top: 0, 
					left: (width + defalut.gap) * key
				});
			} else {
				var min_h = columns[0];
				var min_k = 0;

				// 取出最小列及下标
				for(var i=0; i<columns.length; i++) {
					if(columns[i] < min_h) {
						min_h = columns[i];
						min_k = i;
					}
				}

				// 更新当前列的高度
				columns[min_k] += height;

				$(val).css({
					top: min_h + defalut.gap,
					left: (width + defalut.gap) * min_k
				});
			}
		});

		// 排序
		columns = columns.sort(function (a, b) {
			return b - a;
		});

		_this.css({
			height: columns[0]
		});

	}
})(jQuery);



Jsonp 跨域：
// jQuery中JSONP是通过$.ajax()，来实现的
$.ajax({
    url: 'http://api.study.com/jsonp.php',
    type: 'get',
    // 这里需要将dataType 指定为jsonp
    dataType: 'jsonp',
    data: {name: 'itcast'},
    // 以字符串形式将事先定义好的函数名传递进来
    // jsonpCallback: 'test',
    // jsonp: 'call',
    success: function (data) {
        // console.log(data);
    },
    error: function (err) {
        console.log(err);
    }
});


H5
    HTML5并不仅仅只是做为HTML标记语言的一个最新版本，更重要的是它制定了Web应用开发的一系列标准，成为第一个将Web做为应用开发平台的HTML语言。
    HTML5定义了一系列新元素，如新语义标签、智能表单、多媒体标签等，可以帮助开发者创建富互联网应用，还提供了一些Javascript API，如地理定位、重力感应、硬件访问等，
    可以在浏览器内实现类原生应用，甚至结合Canvas我们可开发网页版游戏。
语义标签
    语义标签对于我们并不陌生，如<p>表示一个段落、<ul>表示一个无序列表<h1> ~ <h6>表示一系列标题等，在此基础上HTML5增加了大量更有意义的语义标签，
    更有利于搜索引擎或辅助设备来理解HTML页面内容。
    传统的做法我们或许通过增加类名如class="header"、class="footer"，使HTML页面具有语义性，但是不具有通用性。
    HTML5则是通过新增语义标签的形式来解决这个问题，例如<header></header>、<footer></footer>等，这样就可以使其具有通用性。

常用新语义标签
    <nav> 表示导航
    <header> 表示页眉
    <footer> 表示页脚
    <section> 表示区块
    <article> 表示文章 如文章、评论、帖子、博客
    <aside> 表示侧边栏 如文章的侧栏
    <figure> 表示媒介内容分组 与 ul > li 做个比较
    <mark> 表示标记 (带用“UI”，不怎么用，可以重写样式)
    <progress> 表示进度 (带用“UI”，不怎么用，不可重写样式)
    <time> 表示日期
    <hgroup> 标题列表 (据说已废弃)
    <details>
    <bdi>
    <command>
    <summary>
    <rp>
    <rt>
    <ruby>
    本质上新语义标签与<div>、<span>没有区别，只是其具有表意性，使用时除了在HTML结构上需要注意外，其它和普通标签的使用无任何差别，可以理解成<div class="nav"> 
    相当于 <nav>。不要好奇，它只是一个标签！尽量避免全局使用header、footer、aside等语义标签。

兼容处理
    在不支持HTML5新标签的浏览器里，会将这些新的标签解析成行内元素(inline)对待，所以我们只需要将其转换成块元素(block)即可使用，但是在IE9版本以下，
    并不能正常解析这些新标签，但是却可以识别通过document.createElement('tagName')创建的自定义标签，于是我们的解决方案就是将HTML5的新标签
    全部通过document.createElement('tagName')来创建一遍，这样IE低版本也能正常解析HTML5新标签了，在实际开发中我们更多采用的是通过检测IE浏览器
    的版本来加载第三方的一个JS库来解决兼容问题。
    <!--[if lte IE 8]>
        <script src./js/html5shiv.min.js></script>
    <![endif]-->
表单
    伴随着互联网富应用以及移动开发的兴起，传统的Web表单已经越来越不能满足开发的需求，所以HTML5在Web表单方向也做了很大的改进，如拾色器、日期/时间组件等，使表单处理更加高效。    
    输入类型
        email 输入email格式
        tel 手机号码
        url 只能输入url格式
        number 只能输入数字
        search 搜索框
        range 范围
        color 拾色器
        time	时间
        date 日期 不是绝对的
        datetime 时间日期
        month 月份
        week 星期
        部分类型是针对移动设备生效的，且具有一定的兼容性，在实际应用当中可选择性的使用。
    表单元素（标签）
        <datalist> 下拉选项，使用中文时要注意
        <keygen> 生成加密字符串
        <output> 不可当做数据提交？
        <meter> 表示度量器，不建议用作进度条
    表单属性
        placeholder 占位符
        autofocus 获取焦点
        multiple 文件上传多选或多个邮箱地址
        autocomplete 自动完成，用于form元素，也可用于部分input，默认值on
        form 指定表单项属于哪个form，处理复杂表单时会需要
        novalidate 关闭验证，可用于<form>标签，（只适应用form）
        required 验证条件，必填项
        pattern 正则表达式 自定义验证规则
        表单重写没有提及，自行验证，共包含
        formaction、formenctype、formtarget、formmethod、formnovalidate
        应用于提交按钮上，如：<input type="submit" formaction="xxx.php">
    表单事件
        oninput 用户输入内容时触发，可用于移动端输入字数统计
        oninvalid 验证不通过时触发
多媒体
    在HTML5之前，在网页上播放音频/视频的通用方法是利用Flash来播放，但是大多情况下，并非所有用户的浏览器都安装了Flash插件，
    由此使得处理音频/视频播放变的非常复杂，并且移动设备的浏览器并不支持Flash插件。
    音频
        HTML5通过<audio>标签来解决音频播放的问题。
        使用相当简单，如下所示
        <!--通过src指定的音频文件路径即可-->
        <audio src="./music/see you again.mp3"></audio>
    并且可以通过附加属性可以更友好控制音频的播放，如：
    autoplay 自动播放
    controls 是否显不默认播放控件
    loop 循环播放
    preload 预加载 同时设置autoplay时些属性失效
    由于版权等原因，不同的浏览器可支持播放的格式是不一样的
                IE9  Firefox3.5  Opera10.5  Chorme3.0   Safari3.0
    Ogg Vorbis         Y           Y          Y
    mp3          Y                            Y            Y
    Wav                Y           Y                       Y
    多浏览器支持的方案，如下
    <audio src="" controls>
        <!--通过source标签指定多格式音频文件-->
        <source src="./music/See you again.mp3">
        <source src="./music/See you again.wav">
        <source src="./music/See you again.ogg">
        您的浏览器不支持HTML音频播放功能
    </audio>

视频
    HTML5通过<video>标签来解决音频播放的问题。
    同音频播放一样，<video>使用也相当简单，如下
    <!--通过src指定的音频文件路径即可-->
    <video src="./music/see you again.mp3"></video>
    同样，通过附加属性可以更友好的控制视频的播放
    autoplay 自动播放
    controls 是否显示默认播放控件
    loop 循环播放
    preload 预加载，同时设置了autoplay，此属性将失效
    width 设置播放窗口宽度
    height 设置播放窗口的高度
    由于版权等原因，不同的浏览器可支持播放的格式是不一样的 -- 见图片
    多浏览器支持的方案，如下
    <video controls="controls">
        <!--通过source标签指定多格式视频文件-->
        <source src="./video/movie.ogg">
        <source src="./video/movie.mp4">
        您的浏览器不支持HTML视频播放功能
    </audio>

微数据
    http://kayosite.com/html5-microdata.html
    可以理解成新语义标签的一种补充
ARIA
    http://www.zhangxinxu.com/wordpress/2012/03/wai-aria-%E6%97%A0%E9%9A%9C%E7%A2%8D%E9%98%85%E8%AF%BB/#ariaRole

DOM扩展
    获取元素
        1、document.getElementsByClassName ('class') 通过类名获取元素，以类数组形式存在。
        2、document.querySelector('selector') 通过CSS选择器获取元素，符合匹配条件的第1个元素。
        3、document.querySelectorAll('selector') 通过CSS选择器获取元素，以类数组形式存在。
	类名操作
        1、Node.classList.add('class') 添加class
        2、Node.classList.remove('class') 移除class
        3、Node.classList.toggle('class') 切换class，有则移除，无则添加
        4、Node.classList.contains('class') 检测是否存在class
        Node指一个有效的DOM节点，是一个通称。
	自定义属性
        在HTML5中我们可以自定义属性，其格式如下data-*=""，例如
        data-info="我是自定义属性"，通过Node.dataset['info'] 我们便可以获取到自定义的属性值。
        Node.dataset是以对象形式存在的
        当我们如下格式设置时，则需要以驼峰格式才能正确获取
        data-my-name="baidu"，获取Node.dataset['myName']


新增API

拖拽
    在HTML5的规范中，我们可以通过为元素增加draggable="true"来设置此元素是否可以进行拖拽操作，其中图片、链接默认是开启的。
    拖拽元素    
        页面中设置了draggable="true"属性的元素
    目标元素
        页面中任何一个元素都可以成为目标元素

    事件监听
        拖拽元素
        ondrag 		应用于拖拽元素，整个拖拽过程都会调用
        ondragstart	应用于拖拽元素，当拖拽开始时调用
        ondragleave	应用于拖拽元素，当鼠标离开拖拽元素时调用
        ondragend	应用于拖拽元素，当拖拽结束时调用
        目标元素
        ondragenter	应用于目标元素，当拖拽元素进入时调用
        ondragover	应用于目标元素，当停留在目标元素上时调用
        ondrop		应用于目标元素，当在目标元素上松开鼠标时调用
        ondragleave	应用于目标元素，当鼠标离开目标元素时调用
        数据传递
        ev.dataTransfer.setData() 设置数据
        ev.dataTransfer.getData() 读取数据
历史管理
    提供window.history，对象我们可以管理历史记录，可用于单页面应用，Single Page Application，可以无刷新改变网页内容。
    旧版本
        history.back() 回退
        history.forward() 前进
        history.go(n) 前进/后退n步，正值前进，负值后退
        history.length历史记录条数
    新增方法
        1、pushState(data, title, url) 追加一条历史记录
            data用于存储自定义数据，通常设为null
            title网页标题，基本上没有被支持，一般设为空
            url 以当前域为基础增加一条历史记录，不可跨域设置
        2、replaceState(data, title, url) 与pushState()基本相同，不同之处在于replaceState()，只是替换当前url，不会增加/减少历史记录。
        Single Page Application单页面应用
    事件监听
        onpopstate事件，当前进或后退时则触发，通过事件对象ev.state可以读取到存储的数据，监听是要给window。
地理定位
    在HTML规范中，增加了获取用户地理信息的API，这样使得我们可以基于用户位置开发互联网应用，即基于位置服务 (Location Base Service)
    获取地理信息方式
        1、IP地址
        2、三维坐标
            GPS（Global Positioning System，全球定位系统）
            Wi-Fi
            手机信号
        3、用户自定义数据
        如附图对不同获取方式的优缺点进行了比较，浏览器会自动以最优方式去获取用户地理信息。
    隐私
    HTML5 Geolocation 规范提供了一套保护用户隐私的机制。必须先得到用户明确许可，才能获取用户的位置信息。
    API详解
        navigator.getCurrentPosition(successCallback, errorCallback, options) 获取当前地理信息
        navigator.watchPosition(successCallback, errorCallback, options) 重复获取当前地理信息
        1、当成功获取地理信息后，会调用succssCallback，并返回一个包含位置信息的对象position。
            position.coords.latitude纬度
            position.coords.longitude经度
            position.coords.accuracy精度
            position.coords.altitude海拔高度
        2、当获取地理信息失败后，会调用errorCallback，并返回错误信息error
        3、可选参数 options 对象可以调整位置信息数据收集方式
            a) enableHighAccuracy 高精度模式
            b) timeout 超时设置，单位为ms
            c) maximumAge表示浏览器重新获取位置信息的时间间隔，单位为ms

Web存储
    随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出解决方案
	特性
        1、设置、读取方便
        2、容量较大，sessionStorage约5M、localStorage约20M
        4、只能存储字符串，可以将对象JSON.stringify() 编码后存储
    window.sessionStorage
        1、生命周期为关闭浏览器窗口
        2、在同一个窗口下数据可以共享
    window.localStorage
        1、永久生效，除非手动删除
        2、可以多窗口共享
    方法详解
        setItem(key, value) 设置存储内容
        getItem(key) 读取存储内容
        removeItem(key) 删除键值为key的存储内容
        clear() 清空所有存储内容
        key(n) 以索引值来获取存储内容
    其它
        WebSQL、IndexDB
全屏
    HTML5规范允许用户自定义网页上任一元素全屏显示。
        requestFullScreen() 开启全屏显示
        cancleFullScreen() 关闭全屏显示
    不同浏览器需要添加前缀如：
        webkitRequestFullScreen、mozRequestFullScreen
        webkitCancelFullScreen、mozCancelFullScreen
    规范允许所有元素可以取全屏，但实际测试结果关闭全屏只能添加到document元素上
    通过document.fullScreen检测当前是否处于全屏状态
    不同浏览器需要添加前缀
        document.webkitIsFullScreen、document.mozFullScreen
    全屏伪类
        :full-screen .box {}、:-webkit-full-screen {}、:moz-full-screen {}

网络状态
    我们可以通过window. navigator.onLine来检测，用户当前的网络状况，返回一个布尔值
    addEventListener 进行绑定online用户网络连接时被调用
    addEventListener 进行绑定.offline用户网络断开时被调用
    事件是给window绑订的

应用缓存
    HTML5中我们可以轻松的构建一个离线（无网络状态）应用，只需要创建一个cache manifest文件。
    优势
        1、可配置需要缓存的资源
        2、网络无连接应用仍可用
        3、本地读取缓存资源，提升访问速度，增强用户体验
        4、减少请求，缓解服务器负担
    缓存清单
        一个普通文本文件，其中列出了浏览器应缓存以供离线访问的资源，推荐使用.appcache为后缀名，添加MIME类型
        AddType text/cache-manifest .appcache
        例如我们创建了一个名为demo.appcache的文件，然后在需要应用缓存在页面的根元素(html)添加属性manifest="demo.appcache"，路径要保证正确。
    manifest文件格式
        1、顶行写CACHE MANIFEST
        2、CACHE: 换行 指定我们需要缓存的静态资源，如.css、image、js等
        3、NETWORK: 换行 指定需要在线访问的资源，可使用通配符
        4、FALLBACK: 换行 当被缓存的文件找不到时的备用资源
    事件监听
    其它
        1、CACHE: 可以省略，这种情况下将需要缓存的资源写在CACHE MANIFEST
        2、可以指定多个CACHE:  NETWORK:  FALLBACK:，无顺序限制
        3、#表示注释，只有当demo.appcache文件内容发生改变时或者手动清除缓存后，才会重新缓存。
        4、chrome 可以通过chrome://appcache-internals/工具和离线（offline）模式来调试管理应用缓存
文件读取
    通过FileReader对象我们可以读取本地存储的文件，可以使用 File 对象来指定所要读取的文件或数据。其中File对象可以是来自用户在一个 <input> 元素上选择文件后返回的FileList 对象，也可以来自由拖放操作生成的  DataTransfer
    FileList对象
        由于HTML5中我们可以通过为表单元素添加multiple属性，因此我们通过<input>上传文件后得到的是一个FileList对象（伪数组形式）。
    FileReader对象
    HTML5新增内建对象，可以读取本地文件内容。
    var reader = new FileReader; 可以实例化一个对象
    实例方法
        1、readAsDataURL() 以DataURL形式读取文件
    事件监听
        onload 当文读取完成时调用
    属性
        result 文件读取结果
    参考资料
    https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc

多媒体
    方法：load()、play()、pause()
    属性：currentSrc、currentTime、duration
    事件：
    参考文档
    http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp


Css3:

    []		表示全部可选项
    ||		表示或者
    |		表示多选一
    ？	表示0个或者1个
    *		表示0个或者多个
    {}		表示范围

选择器：

属性选择器
    其特点是通过属性来选择元素，具体有以下5种形式：
    1、E[attr] 表示存在attr属性即可；
    2、E[attr=val] 表示属性值完全等于val；
    3、E[attr*=val] 表示的属性值里包含val字符并且在“任意”位置；
    4、E[attr^=val] 表示的属性值里包含val字符并且在“开始”位置；
    5、E[attr$=val] 表示的属性值里包含val字符并且在“结束”位置；
伪类选择器
    除了以前学过的:link、:active、:visited、:hover，CSS3又新增了其它的伪类选择器。
    1、以某元素相对于其父元素或兄弟元素的位置来获取无素的结构伪类。
        重点理解通过E来确定元素的父元素。
        E:first-child第一个子元素
        E:last-child最后一个子元素
        E:nth-child(n) 第n个子元素，计算方法是E元素的全部兄弟元素；
        E:nth-last-child(n) 同E:nth-child(n) 相似，只是倒着计算；
        n遵循线性变化，其取值0、1、2、3、4、... 但是当n<=0时，选取无效。
        n可是多种形式：nth-child(2n+0)、nth-child(2n+1)、nth-child(-1n+3)等；
        需要满足y=ax+b
        注：指E元素的父元素，并对应位置的子元素必须是E
        E:empty 选中没有任何子节点的E元素；（使用不是非常广泛）
    2、目标伪类
      E:target 结合锚点进行使用，处于当前锚点的元素会被选中；

伪元素选择器
    E::first-letter文本的第一个单词或字（如中文、日文、韩文等）；
    E::first-line 文本第一行；
    E::selection 可改变选中文本的样式；
    重点：E::before、E::after
        是一个行内元素，需要转换成块元素
        E:after、E:before 在旧版本里是伪元素，CSS3的规范里“:”用来表示伪类，“::”用来表示伪元素，但是在高版本浏览器下E:after、E:before会被自动识别为E::after、E::before，这样做的目的是用来做兼容处理。
        E:after、E:before后面的练习中会反复用到，目前只需要有个大致了解
        ":" 与 "::" 区别在于区分伪类和伪元素
    参考文档
        :before和::before的区别
        https://www.qianduan.net/before-and-before-the-difference-between/
颜色
    新增了RGBA、HSLA模式，其中的A 表示透明度通道，即可以设置颜色值的透明度，相较opacity，它们不具有继承性，即不会影响子元素的透明度。
    Red、Green、Blue、Alpha即RGBA
    Hue、Saturation、Lightness、Alpha即HSLA
    R、G、B 取值范围0~255
    H 色调 取值范围0~360，0/360表示红色、120表示绿色、240表示蓝色
    S 饱和度 取值范围0%~100%
    L 亮度 取值范围0%~100%
    A 透明度 取值范围0~1
    关于透明度：
        1、opacity只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度；
        2 、transparent 不可调节透明度，始终完全透明
        RGBA、HSLA可应用于所有使用颜色的地方。
文本
    text-shadow，可分别设置偏移量、模糊度、颜色（可设透明度）。
        1、水平偏移量 正值向右 负值向左；
        2、垂直偏移量 正值向下 负值向上；
        3、模糊度是不能为负值；
边框
    其中边框圆角、边框阴影属性，应用十分广泛，兼容性也相对较好，具有符合渐进增强原则的特征

边框圆角
border-radius
    圆角处理时，脑中要形成圆、圆心、横轴、纵轴的概念，正圆是椭圆的一种特殊情况  附图

边框阴影
    box-shadow
        1、水平偏移量 正值向右 负值向左；
        2、垂直偏移量 正值向下 负值向上；
        3、模糊度是不能为负值；
        4、inset可以设置内阴影；
        设置边框阴影不会改变盒子的大小，即不会影响其兄弟元素的布局。
        可以设置多重边框阴影，实现更好的效果，增强立体感。

边框图片
    border-image
    设置的图片将会被“切割”成九宫格形式，然后进行设置。
    1、round和repeat之间的区别
        round 会自动调整尺寸，完整显示边框图片。

盒模型
    CSS3中可以通过box-sizing 来指定盒模型，即可指定为content-box、border-box，这样我们计算盒子大小的方式就发生了改变。
    可以分成两种情况：
        1、box-sizing: border-box  计算方式为content = width – border - padding  变小了
        2、box-sizing: content-box  计算方式为content = width
    兼容性比较好


背景
    背景在CSS3中也得到很大程度的增强，比如背景图片尺寸、背景裁切区域、背景定位参照点、多重背景等。
    1、background-size设置背景图片的尺寸
        cover会自动调整缩放比例，保证图片始终填充满背景区域，如有溢出部分则会被隐藏。 完全的充满这一张
        contain会自动调整缩放比例，保证图片始终完整显示在背景区域。 也就是背景图片可能有多张而拼凑出来
        也可以使用长度单位或百分比 
    2、background-origin设置背景定位的原点
        border-box以边框做为参考原点；
        padding-box以内边距做为参考原点；
        content-box以内容区做为参考点；
    3、background-clip设置背景区域裁切
        border-box裁切边框以内为背景区域；
        padding-box裁切内边距以内为背景区域；
        content-box裁切内容区做为背景区域；
    4、以逗号分隔可以设置多背景，可用于自适应局
        背景图片尺寸在实际开发中应用十分广泛。
渐变
    渐变是CSS3当中比较丰富多彩的一个特性，通过渐变我们可以实现许多炫丽的效果，有效的减少图片的使用数量，并且具有很强的适应性和可扩展性。
    可分为线性渐变、径向渐变

线性渐变
    linear-gradient线性渐变指沿着某条直线朝一个方向产生渐变效果。
    从黄色渐变到绿色
        1、必要的元素：
        a、方向
        b、起始颜色
        c、终止色；
    关于方向附图
 
径向渐变
    radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果
    
    1、必要的元素：
        a、辐射范围即圆半径 
        b、中心点 即圆的中心
        c、渐变起始色
        d、渐变终止色
    2、关于中心点：中心位置参照的是盒子的左上角
    3、关于辐射范围：其半径可以不等，即可以是椭圆

径向渐变
radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果 
    1、必要的元素：
        a、辐射范围即圆半径 
        b、中心点 即圆的中心
        c、渐变起始色
        d、渐变终止色
    2、关于中心点：中心位置参照的是盒子的左上角
    3、关于辐射范围：其半径可以不等，即可以是椭圆

过渡
    过渡是CSS3中具有颠覆性的特征之一，可以实现元素不同状态间的平滑过渡（补间动画），经常用来制作动画效果。
    帧动画：通过一帧一帧的画面按照固定顺序和速度播放。如电影胶片
    补间动画：自动完成从起始状态到终止状态的的过渡。
    关于补间动画更多学习可查看http://mux.alimama.com/posts/1009
    特点：当前元素只要有“属性”发生变化时，可以平滑的进行过渡。
    transition-property设置过渡属性
    transition-duration设置过渡时间
    transition-timing-function设置过渡速度
    transition-delay设置过渡延时

2D转换
    转换是CSS3中具有颠覆性的特征之一，可以实现元素的位移、旋转、变形、缩放，甚至支持矩阵方式，配合即将学习的过渡和动画知识，可以取代大量之前只能靠Flash才可以实现的效果。
        1、移动 translate(x, y) 可以改变元素的位置，x、y可为负值；
        2、缩放 scale(x, y) 可以对元素进行水平和垂直方向的缩放，x、y的取值可为小数，不可为负值；
        4、旋转 rotate(deg) 可以对元素进行旋转，正值为顺时针，负值为逆时针；
        5、倾斜 skew(deg, deg) 可以使元素按一定的角度进行倾斜
3D转换
    1、3D坐标轴
        用X、Y、Z分别表示空间的3个维度，三条轴互相垂直
    2、左手坐标系
        伸出左手，让拇指和食指成“L”形，大拇指向右，食指向上，中指指向前方。这样我们就建立了一个左手坐标系，拇指、食指和中指分别代表X、Y、Z轴的正方向
    3、左手法则
        左手握住旋转轴，竖起拇指指向旋转轴正方向，正向就是其余手指卷曲的方向。

动画
    动画是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。
    1、必要元素：
        a、通过@keyframes指定动画序列；
        b、通过百分比将动画序列分割成多个节点；
        c、在各节点中分别定义各属性
        d、通过animation将动画应用于相应元素；
    2、关键属性
        a、animation-name设置动画序列名称
        b、animation-duration动画持续时间
        c、animation-delay动画延时时间
        d、animation-timing-function动画执行速度，linear、ease等
        e、animation-play-state动画播放状态，play、paused等
        f、animation-direction动画逆播，alternate等
        g、animation-fill-mode动画执行完毕后状态，forwards、backwards等
        h、animation-iteration-count动画执行次数，inifinate等


伸缩布局 附图
    CSS3在布局方面做了非常大的改进，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。
    主轴：Flex容器的主轴主要用来配置Flex项目，默认是水平方向
    侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向的
    方向：默认主轴从左向右，侧轴默认从上到下
    主轴和侧轴并不是固定不变的，通过flex-direction可以互换。

    1、必要元素：
        a、指定一个盒子为伸缩盒子 display: flex
        b、设置属性来调整此盒的子元素的布局方式 例如 flex-direction
        c、明确主侧轴及方向
        d、可互换主侧轴，也可改变方向
    2、各属性详解
        a、flex-direction调整主轴方向（默认为水平方向）
        b、justify-content调整主轴对齐
        c、align-items调整侧轴对齐
        d、flex-wrap控制是否换行
        e、align-content堆栈（由flex-wrap产生的独立行）对齐
        f、flex-flow是flex-direction、flex-wrap的简写形式
        g、flex控制子项目的缩放比例
        h、order控制子项目的排列顺序

字体格式
不同浏览器所支持的字体格式是不一样的，我们有必要了解一下有关字体格式的知识。
    1、TureTpe(.ttf)格式
        .ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；
    2、OpenType(.otf)格式
        .otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，支持这种字体的浏览器有Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；
    3、Web Open Font Format(.woff)格式
        woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；
    4、Embedded Open Type(.eot)格式
        .eot字体是IE专用字体，可以从TrueType创建此格式字体，支持这种字体的浏览器有IE4+；
    5、SVG(.svg)格式
        .svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+；
    了解了上面的知识后，我们就需要为不同的浏览器准备不同格式的字体，通常我们会通过字体生成工具帮我们生成各种格式的字体，因此无需过于在意字体格式间的区别差异。
    推荐http://www.zhaozi.cn/、http://www.youziku.com/ 查找更多中文字体


字体图标
    其实我们可以把文字理解成是一种特殊形状的图片，反之我们是不是也可以把图片制作成字体呢？
    答案是肯定的。
    常见的是把网页常用的一些小的图标，借助工具帮我们生成一个字体包，然后就可以像使用文字一样使用图标了。
    优点：
        1、将所有图标打包成字体库，减少请求；
        2、具有矢量性，可保证清晰度；
        3、使用灵活，便于维护；
    Font Awesome 使用介绍
        http://fontawesome.dashgame.com/
    定制自已的字体图标库
        http://iconfont.cn/
        https://icomoon.io/
    SVG素材
        http://www.iconsvg.com/


通过http://caniuse.com/ 可查询CSS3各特性的支持程度，一般兼容性处理的常见方法是为属性
添加私有前缀，如不能解决，应避免使用，无需刻意去处理CSS3的兼容性问题。


私有前缀：
    /*-webkit- 内核的浏览器会识别*/
    -webkit-border-radius: 100px;
    /*火狐浏览器 当属稳定后会将带前缀的属性废弃*/
    -moz-border-radius: 100px;
    border-radius: 100px;
    /*欧朋*/
    /*-o-*/
    /*IE*/
    /*-ms-*/

锚点：
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CSS3 动画</title>
    <style>
        html,
        body {
            height: 100%;
            overflow: hidden;
        }
        
        body {
            margin: 0;
            padding: 0;
            position: relative;
        }
        
        ul.handle {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .handle li {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .handle li:nth-child(1) {
            background: url(./images/bg1.jpg);
            background-size: cover;
            z-index: 3;
        }
        
        .handle li:nth-child(2) {
            background: url(./images/bg2.jpg);
            background-size: cover;
            z-index: 2;
        }
        
        .handle li:nth-child(3) {
            background: url(./images/bg3.jpg);
            background-size: cover;
            z-index: 1;
        }
        
        .btn {
            width: 100%;
            height: 120px;
            text-align: center;
            position: absolute;
            bottom: 80px;
            z-index: 10;
        }
        
        .btn li {
            display: inline-block;
            width: 120px;
            height: 120px;
            text-align: center;
            line-height: 120px;
            font-size: 30px;
            border-radius: 50%;
            background: pink;
            margin: 0 10px;
        }
        
        .btn a {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: #000;
        }
        /*表明第一个锚点被选中*/
        
        #img1:target {
            z-index: 3;
            /*可以定义一个动画*/
            animation: slideleft 1s;
        }
        /*表明第二个锚点被选中*/
        
        #img2:target {
            z-index: 3;
        }
        /*表明第三个锚点被选中*/
        
        #img3:target {
            z-index: 3;
        }
        
        @keyframes slideleft {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }
    </style>
</head>

<body>
    <ul class="handle">
        <li id="img1"></li>
        <li id="img2"></li>
        <li id="img3"></li>
    </ul>

    <ul class="btn">
        <li>
            <a href="#img1">1</a>
        </li>
        <li>
            <a href="#img2">2</a>
        </li>
        <li>
            <a href="#img3">3</a>
        </li>
    </ul>
</body>

</html>


