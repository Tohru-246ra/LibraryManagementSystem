<?php
    if (isset($_COOKIE["PHPSESSID"])) {
        session_start();

        if ( !(isset( $_SESSION["login"] )) ) {
            header("Location:/LMS/html/forbidden.html");
            exit;
        }
    } else {
        header("Location:/LMS/html/forbidden.html");
        exit;
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
    <link rel="stylesheet" href="/LMS/css/register_book.css">
    <script src="/LMS/js/register_book.js" defer></script>
    <script src="/LMS/js/login_user.js" defer></script>
    <script src="/LMS/js/logout.js" defer></script>
    <script src="/LMS/js/login_check.js" defer></script>
    <script src="/LMS/js/user_menu.js" defer></script>
</head>
<body>
    <header>
        <h2 class="service-name"><a href="/LMS/index.html">LMS <span style="font-size:70%">Library Management System</span></a></h2>
        <nav class="nav">
            <div class="nav-left">
                <a class="nav-link"  href="/LMS/html/search.html">SEARCH</a>
                <a class="nav-link" id="login-check1"  href="#">REGISTER</a>
                <a class="nav-link" id="login-check2" href="#">EDIT</a>
                <a class="nav-link" href="/LMS/html/register_user.html">SIGN UP</a>
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
            <p><a class="user-menu-link" href="/LMS/html/login.html">SIGN IN</a></p>
            <p><a class="user-menu-link" id="logout" href="#">SIGN OUT</a></p>
        </div>
    </header>
    <main>
        <div class="main-container">
            <h3>書籍の登録を行います</h3>
            <form id="form-isbn">
                <!--
                ユーザー名</br>
                <select id="select"></select>
                <p></p>
                -->
                <p>ISBNコード</p>
                <input type="text" name="dummy" style="display:none;">
                <input type="text" id="isbn" name="isbn"></br>
                <input type="radio" name="read" value="0" id="not-read" checked>
                <label for="not-read">未読</label>
                <input type="radio" name="read" value="1" id="read">
                <label for="read">既読</label>
                <div>                
                    <input type="button" id="register" class="register" value="登録" onclick="onclick_btn()">
                </div>
            </form>
            <form id="form-mani" style="display:none;">
                <p class="tag isbn">ISBN</p>
                <span id="isbn-copy"></span>
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
                <input type="radio" name="read" value="0" id="not-read" checked>
                <label for="not-read">未読</label>
                <input type="radio" name="read" value="1" id="read">
                <label for="read">既読</label>
                <div>                
                    <input type="button" id="register" class="register" value="登録" onclick="onclick_btn()">
                </div>
            </form>
        </div>
    </main>
    <footer>
        <p>© 2023 tohru</p>
    </footer>
</body>
</html>