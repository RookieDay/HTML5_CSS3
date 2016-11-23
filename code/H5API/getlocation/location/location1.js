if (navigator.geoloaction) {
    navigator.goeolocation.getCurrentPosition(
        function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log(location);
            var map = new BMap.Map('container');
            var point = new BMap.Point(longitude, latitude);
            map.centerAndZoom(point, 15);
            // 定义好了一个图片标记
            var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));
            var marker = new BMap.Marker(point, { icon: myIcon });
            map.addOverlay(marker);
        },
        function(error) {
            console.log(err);
        }
    )
}