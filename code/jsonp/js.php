<?php

	header('Content-Type: text/javascript; charset=utf-8');

	// $num = $_GET['num'];

	// echo 'alert('. $num .')';

	// 从数据库里取数据了
	$arr = array(
		"name"=>"itcst",
		"age"=>10
	);

	// 编码处理
	$json = json_encode($arr);

	$callback = $_GET['callback'];

	echo $callback . '(' . $json . ')';
?>