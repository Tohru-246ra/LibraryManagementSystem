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

    $user = $obj["user"];
    $pass = hash('sha256',$obj["pass"]);

    $result1 = mysqli_query($con,"
        insert into users(user,pass)
        values('{$user}','{$pass}');
        ");
    
    $result2 = mysqli_query($con,"
        alter table books add column {$user} bool default 0;
        ");

    if (!$result1 || !$result2) {
        //echo false;
        die(mysqli_error($con));
    } else {
        echo true;
    }
?>