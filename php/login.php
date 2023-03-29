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

    $result = mysqli_query($con,"select * from users where user='{$user}';");
    $data = mysqli_fetch_array($result,MYSQLI_ASSOC);
    
    if (!$data) {
        echo "no data";
    } else if ($data["pass"] !== $pass) {
        echo "not match pass";
    } else {
        session_start();

        $_SESSION["login"] = $user;
        
        echo $_SESSION["login"];
    }
?>