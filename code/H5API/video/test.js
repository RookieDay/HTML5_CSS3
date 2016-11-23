var video = document.querySelector('video');
var current = $('.current');
var line = $('.line');

video.oncanplay = function() {
    var duration = video.duration;
    var h = Math.floor(duration / 3600);
    var m = Math.floor(duration / 60);
    var s = Math.floor(duration % 60);

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    $('.total').text(h + ':' + m + ':' + s);
}
$('.switch').on('click', function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    $(this).toggleClass('fa-play fa-pause');
})

video.ontimeupdate = function() {
    var currentTime = video.currentTime;
    var duration = video.duration;
    var h = Math.floor(currentTime / 3600);
    var m = Math.floor(currentTime / 60);
    var s = Math.floor(currentTime % 60);

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    current.text(h + ':' + m + ':' + s);
    if (currentTime > 0) {
        var loaded = currentTime / duration * 100;
    }
    line.css('width', loaded + '%');
}
$('.bar').on('click', function(ev) {
    var width = $(this).width();
    var offsetX = ev.offsetX;
    video.currentTime = offsetX / width　 * video.duration;
});
video.onended = function() {
    video.currentTime = 0;
    line.css('width', 0);
    $('.switch').addClass('fa-play').removeClass('fa-pause');
}
$('.expand').on('click', function() {
    video.weibkitRequestFullScreen();
})