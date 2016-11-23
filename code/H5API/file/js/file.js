var file = document.querySelector('.file');
file.onchange = function() {
    console.log(this.files);
    var reader = new FileReader;
    reader.readAsDataURL(this.files[0]);
    reader.onload = function() {
        console.log(reader.result);
        document.querySelector('img').src = reader.result;
    }
}



// var file = document.querySelector('.file');

// 	file.onchange = function () {
// 		// 通过this.files 可以获取File对象
// 		// 通过this.files[0] 可以获第一上传的文件，因为h5支持多文件上传
// 		console.log(this.files);

// 		// 实例化一个文件读取器
// 		var reader = new FileReader;
// 		// 读取刚刚上传上文件
// 		reader.readAsDataURL(this.files[0]);

// 		// 读取完成时
// 		reader.onload = function () {
// 			// console.log(1);
// 			console.log(reader.result);
// 			// 将读取结果放到图片标签里
// 			document.querySelector('img').src = reader.result;
// 		}		
// 	}