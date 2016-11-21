<?php

	header('Content-Type: text/css; charset=utf-8');

	// 获取参数
	$color = $_GET['color'];

	echo 'body {background: '. $color .';}';


?>