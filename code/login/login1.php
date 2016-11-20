<?php

	header('Content-Type:text/html; charset=utf-8');

	// 假数据，数据库里的用户信息
	$users = array(
		'admin'=>'123456',
		'test'=>'654321'
	);

	// 接收用户提交的登录信息
	$username = $_POST['username'];
	$pass = $_POST['pass'];

	// 检测数组中有没有某个Key
	// var_dump(array_key_exists('admin', $users));

	// 检测有无此用户
	if(array_key_exists($username, $users)) {
		// 检测判断数据库中的用户密码与用户提交上来的是否一致
		if($users[$username] == $pass) {
			echo '登录成功';
		} else {
			echo '登录不成功！';
		}
	} else {
		echo '登录失败';
	}


?>