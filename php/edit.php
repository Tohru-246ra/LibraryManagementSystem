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
    $read = $obj['read'];
    $login_user = $obj['login_user'];

    $result = mysqli_query($con,"
        update books set title='{$title}',publisher='{$publisher}',{$login_user}='{$read}',
        author='{$author}',pubdate='{$pubdate}',img='{$img}',description='{$description}' where isbn='{$isbn}';
        ");
    
    if (!$result) {
        echo false;
        //die(mysqli_error($con));
    } else {
        echo true;
    }
?>