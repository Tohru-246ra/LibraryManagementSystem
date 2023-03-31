<?php
    $admin = false;

    if (isset($_COOKIE["PHPSESSID"])) {
        session_start();
        if (isset( $_SESSION["login"] )) {
            ini_set('display_errors', 1 );
            error_reporting(E_ALL);
        
            $DBServer = "localhost";
            $DBUser = "root";
            $DBPassword = "";
            $DBName = "lms_db";
        
            $con = mysqli_connect($DBServer,$DBUser,$DBPassword);
            $selectDB = mysqli_select_db($con,$DBName);
            mysqli_set_charset($con,"utf8");
        
            $result = mysqli_query($con,"select admin from users where user='{$_SESSION["login"]}';");
        
            $data = mysqli_fetch_array($result,MYSQLI_ASSOC);
            
            if ($data["admin"] == 1) {
                $admin =  '<p><a class="user-menu-link" id="admin" href="/LMS/html/admin.php">ADMIN</a></p>';
            } 
        }
    } 
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>LMS</title>
    <meta name="description" content="おうちの本を管理するwebアプリ">
    <!--link rel="stylesheet" href="../../bootstrap-5.3.0-alpha1-dist/css/bootstrap.css"-->
    <script src="../../bootstrap-5.3.0-alpha1-dist/js/bootstrap.js"></script>
    <link rel="stylesheet" href="/LMS/css/style.css">
    <link rel="stylesheet" href="/LMS/css/forbidden.css">
</head>
<body>
    <header>
        <h2 class="service-name"><a href="/LMS/index.php">LMS <span style="font-size:70%">Library Management System</span></a></h2>
        <nav class="nav">
            <div class="nav-left">
                <a class="nav-link"  href="/LMS/html/search.php">SEARCH</a>
                <a class="nav-link" id="login-check1"  href="#">REGISTER</a>
                <a class="nav-link" id="login-check2" href="#">EDIT</a>
                <a class="nav-link" href="/LMS/html/sign_up.php">SIGN UP</a>
            </div>
            <div class="nav-right">
                <a class="nav-link" id="user-menu" href="#">
                    <span id="login-user">GUEST&nbsp&nbsp</span>
                    <svg id="login-user-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"> 
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                </a>
            </div>
        </nav>
        <div id="user-menu-container" tabindex="0">
            <div id="user-menu-link-container">
                <?php
                if ($admin) {
                    echo $admin;
                }
                ?>
                <p><a class="user-menu-link" href="/LMS/html/login.php">SIGN IN</a></p>
                <p><a class="user-menu-link" id="logout" href="#">SIGN OUT</a></p>
            </div>
        </div>
    </header>
    <main>
        <div class="main-container">
            <h1>ログインしてください</h1>
            <a href="/LMS/html/login.php">ログインはこちらから</a>
        </div>
    </main>
    <footer>
        <p>© 2023 tohru</p>
    </footer>
</body>
</html>