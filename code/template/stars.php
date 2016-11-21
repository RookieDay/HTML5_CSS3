<?php
    header('Content-Type:application/json;charset=utf-8');
    $result = file_get_contents('../stars.json');
    echo $result;
?>