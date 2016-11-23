// 网络监听的事件
// online 在线 offline 离线
// 事件是给window绑订的

// 通过window.navigator.onLine可以返回当前的网络状态

// alert(window.navigator.onLine);

window.addEventListener('online', function() {
    // alert('online');
    $('.tips').text('网络已连接').fadeIn(500).delay(1000).fadeOut();
});

window.addEventListener('offline', function() {
    // alert('offline');
    $('.tips').text('网络已断开').fadeIn(500).delay(1000).fadeOut();
});

// 当网络连接时触发
window.addEventListener('online', function() {
    alert('onLine');
});

// 当网络断开连接时触发
window.addEventListener('offline', function() {
    alert('offLine');
});

/**************************华丽的分隔线*******************************/

// 1、事件绑定3种方式
// a 通过标签属性
// b 通过onclick
// c addEventListener('click', function () {})
// 2、新介绍的绑定事件方法有必要自已去看一下
// IE 低版本没有addEventListener()，用 attachEvent()
// removeEventListener()解除事件 IE用detachEvent()


var p = document.querySelector('p');

// p.addEventListener('click', function () {
// 	alert(1);
// });

// p.onclick = function () {
// 	alert(1);
// }