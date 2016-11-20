<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <?php
		$arr = array(
			array('广播'),
			array('发现', '文章', '心情'),
			array('专辑', '生活', '时尚', '兴趣'),
			array('Wiki'),
			array('小组')
		);
		
    ?>
        <ul>
            <?php foreach($arr as $key=>$val) { ?>
            <li>
                <?php foreach($val as $k=>$v) { ?>
                <?php if($k == 0){ ?>
                <a href="javascript:;" class="toplist">
                    <?php echo $v; ?>
                </a>
                <?php } else { ?>
                <a href="javascript:;">
                    <?php echo $v; ?>
                </a>
                <?php } ?>
                <?php } ?>
            </li>
            <?php }?>
        </ul>
</body>

</html>