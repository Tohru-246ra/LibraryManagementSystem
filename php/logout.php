<?php
    session_start();

    if (isset($_COOKIE["PHPSESSID"]) || isset($_COOKIE["user_name"])) {
        setcookie("PHPSESSID", '', time() - 1800, '/');
        setcookie("user_name", '', time() - 1800, '/');
    }

    $_SESSION = array();

    $return = session_unset();

    echo $return;
?>