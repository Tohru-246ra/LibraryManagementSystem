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

    $isbn = $obj['isbn'];

    $result = mysqli_query($con,"
            delete from books where isbn='{$isbn}';
        ");
    
    if (!$result) {
        echo "書籍の消去に失敗しました";
        //die(mysqli_error($con));
    } else {
        echo "書籍を消去しました";
    }
?>