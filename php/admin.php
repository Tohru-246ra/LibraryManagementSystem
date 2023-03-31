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

    $json_string = file_get_contents('php://input');
    $obj = json_decode($json_string,true);

    if ($obj["table"] == 'books') {
        $result = mysqli_query($con,"
            select * from books; 
            ");
    } else if ($obj["table"] == 'users') {
        $result = mysqli_query($con,"
            select * from users; 
            ");
    }

    $array = array();

    while($data = mysqli_fetch_array($result,MYSQLI_ASSOC)){
        if (!( in_array($data,$array) )) {
        $array[] =  $data;
        }
    }
    
    $json_data = json_encode($array);

    if (!$result) {
        echo false;
    } else {
        echo $json_data;
    }
?>