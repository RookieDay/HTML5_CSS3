<?php
	
	// 指定编码集
	header('Content-Type:text/html; charset=utf-8');

	// PHP有专门负责接收前端提交上来的数据
	// 分别是$_POST、$_GET，并且它们是数组形式

	// 

	echo $_POST;        //Array
	print_r($_POST);   //Array ( [name] => A [pass] => A ) 
	print_r($_GET);   //Array ( ) 

	echo '您好' . $_POST['name'];
	echo '您的密码是:' . $_POST['pass'];
	// echo '您的邮箱是:' . $_POST['email'];

	// PHP通过$_FILES来接收前端上传的文件

	print_r($_FILES);

	// sleep(5);

	// 你上传上来的文件通过下面这个方法从临时目录中转到移动自定义的目录中去
	move_uploaded_file($_FILES['photo']['tmp_name'], './images/test.jpg');


	// 接收数据
	// 以get方式接收，通过$_GET可以实现
	// print_r($_GET);

	// echo $_GET['username'];

	// echo $_GET['pass'];

	// 不可以接收文件域
	// echo $_GET['upload'];



	// PHP 可以以post形式接收，通过$_POST实现
	
	// print_r($_POST);

	// echo $_POST['username'];
	// echo '<br>';
	// echo $_POST['pass'];

	// 不可以接收文件域
	// echo $_POST['upload'];

	// get提交$_GET接收,post提交以$_POST 接收，不可交叉使用


    
?>