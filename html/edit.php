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
        } else {
            header("Location:/LMS/html/forbidden.php");
            exit;
        }
    } else {
        header("Location:/LMS/html/forbidden.php");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>LMS</title>
    <meta name="description" content="おうちの本を管理するwebアプリ">
    <script src="../../bootstrap-5.3.0-alpha1-dist/js/bootstrap.js"></script>
    <link rel="stylesheet" href="/LMS/css/style.css">
    <link rel="stylesheet" href="/LMS/css/edit.css">
    <script src="/LMS/js/edit.js" defer></script>
    <script src="/LMS/js/login_user.js" defer></script>
    <script src="/LMS/js/logout.js" defer></script>
    <script src="/LMS/js/login_check.js" defer></script>
    <script src="/LMS/js/user_menu.js" defer></script>
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
            <h3>登録内容の編集を行います</h3>
            <div id="select_edited_book">
                <p>書籍を検索します</p>
                <form id="search"> 
                    <input type="text" name="dummy" style="display:none;">
                    <input type="search" id="search-word" placeholder="キーワードを入力">
                    <input type="button" id="search-botton" value="検索" onclick="onclick_btn1()">
                </form>
                <form id="select"></form>
            </div>
            <form id="edit" style="display:none;">
                <p class="tag title">タイトル</p>
                <input type="text" id="title" class="input">
                <p class="tag author">著者</p>
                <input type="text" id="author" class="input">
                <p class="tag publisher">出版社</p>
                <input type="text" id="publisher" class="input">
                <p class="tag img">書影のURL</p>
                <input type="url" id="img" class="input">
                <p class="tag pubdate">出版日</p>
                <input type="url" id="pubdate" class="input" placeholder="2002-08-07">
                <p class="tag description">書籍の説明</p>              
                <textarea type="url" id="description" class="input"></textarea></br>
                <input type="radio" name="read" value="0" id="not-read">
                <label for="not-read">未読</label>
                <input type="radio" name="read" value="1" id="read">
                <label for="read">既読</label></br>
                <input type="button" id="register" value="登録" onclick="onclick_btn3()">
                <input type="button" id="return" value="戻る" onclick="onclick_btn4()">
                <?php
                if ($data["admin"] == 1) {
                    echo '<input type="button" id="delete" value="消去" 
                        onclick="onclick_btn5()" style="width:90px; height:30px;
                        margin: 0px 0px 30px 85px; color:red;">';
                } 
                ?>
            </form>
        </div>
    </main>
    <footer>
        <p>© 2023 tohru</p>
    </footer>
    <?php
    if (array_key_exists("isbn",$_POST)) {
        echo "<input type='hidden' value='{$_POST['isbn']}' id='get-isbn'>";
    } else {
        echo "<input type='hidden' value='' id='get-isbn'>";
    }
    ?>
</body>
</html>