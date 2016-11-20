<?php

	// 指定文档类型
	header('Content-Type:text/html; charset=utf-8');

	$result = file_get_contents('stars.json');

	$result = json_decode($result);

	$html = '';
	foreach ($result as $key => $value) {

		$html .= '<tr>';
		$html .= '<td>' . $value->name . '</td>';
		$html .= '<td><img src="' . $value->photo . '""></td>';
		$html .= '<td>' . $value->ablum . '</td>';
		$html .= '<td>' . $value->age . '</td>';
		$html .= '<td>' . $value->sex . '</td>';
		$html .= '</tr>';
	}

	echo $html;


?>