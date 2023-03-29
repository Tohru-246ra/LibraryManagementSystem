<?php
    if (isset($_COOKIE["PHPSESSID"])) {
        session_start();

        if (isset($_SESSION["login"])) {
            echo true;
        } else {
            echo false;
        }
    } else {
        echo false;
    }
?>