<?php
	$messages = array(
		'你说啥？',
		'你也好',
		'你找我有啥事？',
		'我在吃饭！'
	);
    echo $messages[array_rand($messages)];
    sleep(1);
?>