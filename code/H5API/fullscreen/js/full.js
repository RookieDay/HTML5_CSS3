var open = document.querySelector('.open');
var cancel = document.querySelector('.cancel');
var box = document.querySelector('.box');

open.onclick = function() {
    // 文档根节点全屏
    document.documentElement.webkitRequestFullScreen();
    //盒子全屏
    // box.webkitRequestFullScreen();
    alert(document.webkitIsFullScreen);
}

cancle.onclick = function() {
    alert(document.webkitIsFullScreen);
    document.webkitCancelFullScreen();
    // document.documentElement.webkitCancelFullScreen();
}