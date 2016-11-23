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

// // 提供了一个对象 navigator.geolocation
// 		// 此对象下有一个方法 getCurrentPosition(); 是用来获取用户当前位置

// 		if(navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(
// 				function (position) {

// 				// 会将获得的定位信息传递给position，并且position是一个对象，在这个对象下面，有一个属性叫coords，coords 也是一个对象，这个对象下面存储着经度和纬度，如下

// 				// 获取到了当前经纬度
// 				var latitude = position.coords.latitude; // 纬度
// 				var longitude = position.coords.longitude; // 经度

// 				// 
// 				console.log(position);


// 				/********************/
// 				// 这些都是写死
// 				var map = new BMap.Map("container"); // container表示主到哪个容器

// 				// 把经度纬度传给百度
// 				var point = new BMap.Point(longitude, latitude);

// 				map.centerAndZoom(point, 15);

// 				/****************************/

// 				// 只写上面三行就可出现地图了，并且会定位

// 				// 定义好了一个图片标记
// 				var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));

// 				// 创建标注
// 				var marker = new BMap.Marker(point, {icon: myIcon});
// 				map.addOverlay(marker);
// 			}, function (err) {
// 				console.log(err);
// 			}
// 			);
// 		}