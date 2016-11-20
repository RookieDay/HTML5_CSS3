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


