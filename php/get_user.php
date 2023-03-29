<?php
    ini_set('display_errors', 1 );
    error_reporting(E_ALL);

    $DBServer = "localhost";
    $DBUser = "root";
    $DBPassword = "";
    $DBName = "lms_db";

    $con = mysqli_connect($DBServer,$DBUser,$DBPassword);
    $selectDB = mysqli_select_db($con,$DBName);
    mysqli_set_charset($con,"utf8");

    $result = mysqli_query($con,"select user from users;");

    $array = array();
    
    while($data = mysqli_fetch_array($result,MYSQLI_ASSOC)){
        $array[] =  $data;
    }

    $json_data = json_encode($array);
    echo($json_data);
?>