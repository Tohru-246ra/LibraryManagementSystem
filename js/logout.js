function login_user_icon(){
    if (document.cookie == "") {
        document.getElementById("login-user").innerHTML = "GUEST&nbsp&nbsp";
    } else {
        const cookieItems = document.cookie.split(';');

        const obj = {};

        cookieItems.forEach((item) => {
            var elem = item.split('=');
            const key = elem[0].trim(); //trim関数で不用なスベースを削除
            const val = decodeURIComponent(elem[1]); //URI形式でエンコードされた文字列をデコード
            obj[key] = val;
        });

        const login_user = obj["user_name"];

        document.getElementById("login-user").innerHTML = `${login_user}&nbsp&nbsp`;
    }
}

document.getElementById("logout").addEventListener('click',() => {

    if (document.cookie != "") {
        const isYes = confirm("ログアウトしますか？");

        if (isYes) {
            document.cookie = "PHPSESSID=; max-age=0";
            document.cookie = "user_name=; max-age=0";

            fetch('/LMS/php/logout.php')
            .then(function(res) {
                return res.text();
            })
            .then(function(text) {
                if (text == true) {

                    document.cookie = "PHPSESSID=; max-age=0";
                    document.cookie = "user_name=; max-age=0";
                    
                    login_user_icon();
                    
                    alert("正常にログアウトできました");
                } else {
                    alert("ログアウトに失敗しました");
                }
            })
        }
    } else {
        alert("ログインしていません");
    }
});