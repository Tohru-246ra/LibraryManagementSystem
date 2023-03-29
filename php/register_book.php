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
    $title = $obj['title'];
    $author = $obj['author'];
    $publisher = $obj['publisher'];
    $img = $obj['img'];
    $pubdate = $obj['pubdate'];
    $description = $obj['description'];
    $user = $obj['user'];
    $regidate = $obj['regidate'];
    $read = $obj['read'];

    $result = mysqli_query($con,"
        insert into books(isbn,title,author,publisher,img,pubdate,description,user,regidate,{$user})
        values('{$isbn}','{$title}','{$author}','{$publisher}','{$img}','{$pubdate}','{$description}','{$user}','{$regidate}',{$read});
        ");
    
    if (!$result) {
        //echo false;
        die(mysqli_error($con));
    } else {
        echo true;
    }
?>