function login_user_icon() {
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

function onclick_btn() {
    const element_user = document.getElementById("user");
    const user = element_user.value;

    const element_pass = document.getElementById("pass");
    const pass = element_pass.value;

    if (user == "" || pass == "") {
        alert("すべての項目に入力してください");
        return 0;
    }

    const obj = {
        user: `${user}`,
        pass: `${pass}`
    };

    const data = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
    };

    async function send(data){
        const res = await fetch('/LMS/php/login.php',data);
        const ans = await res.text();
        if (ans == "not match pass") {
            alert("パスワードが間違っています");            
        } else if (ans == "no data") {
            alert("ユーザーが登録されていません"); 
        } else {
            document.cookie = `user_name=${ans};path=/`;

            login_user_icon();
            
            alert("ログイン成功\nようこそ "+ans+" さん！");
            location.href = "/LMS/index.php";
        }
    }

    send(data);
}

element_pass = document.getElementById("pass");
element_user = document.getElementById("user");

element_pass.addEventListener("keydown",(e) => {
    if(e.key == "Enter") {
      onclick_btn();
    }
});
element_user.addEventListener("keydown",(e) => {
    if(e.key == "Enter") {
        onclick_btn();
    }
});