		var box = document.querySelector('.box');
		var container = document.querySelector('.container');

		// drag
		box.addEventListener('drag', function() {
		    console.log(1);
		});

		// 拖拽开始
		box.addEventListener('dragstart', function() {
		    console.log('start');
		    // this 指的是拖拽元素
		    // 只执行一次
		    // 可以获取更多页面信息如：价格，名称之类
		    this.style.backgroundColor = 'red';
		});

		// 拖拽离开
		box.addEventListener('dragleave', function() {
		    console.log('leave');
		    // 只执行一次
		    this.style.backgroundColor = 'pink';
		});

		// 拖拽结束
		box.addEventListener('dragend', function() {
		    console.log('end');
		    // 只执行一次
		    this.style.backgroundColor = 'blue';
		});



		// 进入到目标
		container.addEventListener('dragenter', function() {
		    // this 指目标元素
		    // 只执行一次
		    console.log('dragenter');
		    this.style.backgroundColor = 'pink';
		});

		// 在目标元素上移动
		container.addEventListener('dragover', function(ev) {
		    console.log('dragover');
		    // 执行多次
		    this.style.backgroundColor = 'yellow';
		    // 终止默认行为
		    ev.preventDefault();
		});

		// 松开鼠标
		container.addEventListener('drop', function(ev) {
		    this.style.backgroundColor = 'black';
		    // ev.preventDefault();
		});