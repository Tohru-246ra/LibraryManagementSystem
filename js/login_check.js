const element1 = document.getElementById("login-check1");
const element2 = document.getElementById("login-check2");

element1.addEventListener('click', () => {
    fetch('/LMS/php/login_check.php')
    .then(function(res) {
        return res.text();
    })
    .then(function(text) {
        if (text == true) {     
            location.href = "/LMS/html/register_book.html";
        } else {
            alert("この操作を行うためにはログインを行ってください");
            const isYes = confirm("ログイン認証を行います");
            if (isYes) {
                location.href = "/LMS/html/login.html";
            } 
        }
    })
})

element2.addEventListener('click', () => {
    fetch('/LMS/php/login_check.php')
    .then(function(res) {
        return res.text();
    })
    .then(function(text) {
        if (text == true) {     
            location.href = "/LMS/html/edit.php";
        } else {
            alert("この操作を行うためにはログインを行ってください");
            const isYes = confirm("ログイン認証を行います");
            if (isYes) {
                location.href = "/LMS/html/login.html";
            } 
        }
    })
})
