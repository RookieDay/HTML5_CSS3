<?php

	// 指定文档类型
	// 可以不指定
	header('Content-Type:application/json; charset=utf-8');

	// 1、PHP连接数据库、读取数据
	// 2、一般情况下会将读取的数据转成数组
	// 3、需要通过json_encode() 来转成json
	// 4、可以将json数据echo，返回给js 或其它语言

	$result = file_get_contents('stars.json');

	echo $result;
	



    
	/**
	 * 解析JSON字符串
	 * json_encode()
	 * json_decode()
	 */
	
	// $arr = array('name'=>'itcast', "age"=>10);

	// $josn = '{"name": "itcast", "age": 10}';

	// echo json_encode($arr);
	// // echo json_decode($arr);
	// var_dump(json_decode($josn));


?>