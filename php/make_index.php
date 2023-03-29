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




    $sum_query = mysqli_query($con,"select count(isbn) as sum from books");

    $result1 = mysqli_query($con,"select * from books where not(img = '' or img = 'null')
                                order by regidate desc limit 10;");

    $array = array();

    $sum = mysqli_fetch_array($sum_query,MYSQLI_ASSOC);

    $array[] = $sum;
    
    $subarray1 = array();

    while($data = mysqli_fetch_array($result1,MYSQLI_ASSOC)){
        $subarray1[] =  $data;
    }

    $array[] = $subarray1;

    if (array_key_exists("user",$obj)) {
        $user = $obj["user"];

        $result2 = mysqli_query($con,"select * from books where not(img = '' or img = 'null')
        and user='{$user}' order by regidate desc limit 10;");

        $subarray2 = array();

        while($data = mysqli_fetch_array($result2,MYSQLI_ASSOC)){
            $subarray2[] =  $data;
        }

        $array[] = $subarray2;
    }

    $json_data = json_encode($array);
    echo($json_data);
?>