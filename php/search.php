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

    $array = array();

    $add_con = "";
    $user = "";

    foreach ($obj as $index => $search) {
        if ($index == "user") {
                $user = $search;
        } else if ($index == "checknum") {
            if ($search == 1 || $search == 7) {
                $add_con = $add_con."and user = '{$user}'";
            } else if ($search == 2) {
                $add_con = $add_con."and {$user} = 1";
            } else if ($search == 3) {
                $add_con = $add_con."and user = '{$user}' and {$user} = 1";
            } else if ($search == 4) {
                $add_con = $add_con."and {$user} = 0";
            } else if ($search == 5) {
                $add_con = $add_con."and user = '{$user}' and {$user} = 0";
            }
        }
    }

    foreach ($obj as $index => $search) {
        if ($index != "user" && $index != "checknum") {
            
            $query =  "select * from books 
            where (title like '%{$search}%' or author like '%{$search}%' or 
            publisher like '%{$search}%' or isbn = '{$search}') ".$add_con.";";

            $result = mysqli_query($con,$query);
    
            while($data = mysqli_fetch_array($result,MYSQLI_ASSOC)){
                if (!( in_array($data,$array) )) {
                $array[] =  $data;
                }
            }
        }
    }

    $json_data = json_encode($array);
    echo($json_data);

?>