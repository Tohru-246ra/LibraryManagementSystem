if (document.cookie == "") {
    document.getElementById("login-user").innerHTML = "GUEST&nbsp&nbsp";
} else {
    let cookieItems = document.cookie.split(';');

    let obj = {};

    cookieItems.forEach((item) => {
        var elem = item.split('=');
        const key = elem[0].trim(); //trim関数で不用なスベースを削除
        const val = decodeURIComponent(elem[1]); //URI形式でエンコードされた文字列をデコード
        obj[key] = val;
    });

    let login_user = obj["user_name"];

    document.getElementById("login-user").innerHTML = `${login_user}&nbsp&nbsp`;
}