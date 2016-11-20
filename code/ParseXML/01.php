<?php
    header('Content-Type:text/xml;charset=utf-8');
    $result = file_get_contents('01.xml');
    echo $result;
?>