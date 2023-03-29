function onclick_btn() {
    element_user = document.getElementById("user");
    const user = element_user.value;

    element_pass1 = document.getElementById("pass1");
    const pass1 = element_pass1.value;

    element_pass2 = document.getElementById("pass2");
    const pass2 = element_pass2.value;

    if (user == "" || pass1 == "" || pass2 == "") {
        alert("すべての項目に入力してください");
        return 0;
    }

    if (pass1 != pass2) {
        alert("パスワードが異なっています");
        element_pass1.value = "";
        element_pass2.value = "";
        return 0;
    }

    const obj = {
        user: `${user}`,
        pass: `${pass1}`
    };

    const data = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
    };

    let isYes = confirm(`${user} としてユーザー登録します\nよろしいですか？`);

    if (isYes) {
        async function send(data){
            const res = await fetch('/LMS/php/register_user.php',data);
            const ans = await res.text();
            if (ans == true) {
                alert("登録が完了しました");
                element_pass1.value = "";
                element_pass2.value = "";
                element_user.value = "";
            } else if (ans == `Duplicate column name '${user}'`) {
                alert(`${user} は既に登録してあります\n他の名前で登録してください`);
                element_user.value = "";
            } else {
                alert("登録に失敗しました");
                element_pass1.value = "";
                element_pass2.value = "";
                element_user.value = "";
            }
        }
    
        send(data);
    }
}

element_user = document.getElementById("user");
element_pass1 = document.getElementById("pass1");
element_pass2 = document.getElementById("pass2");

element_user.addEventListener("keydown",(e) => {
    if(e.key == "Enter") {
      onclick_btn();
    }
  });

element_pass1.addEventListener("keydown",(e) => {
if(e.key == "Enter") {
    onclick_btn();
}
});  

element_pass2.addEventListener("keydown",(e) => {
if(e.key == "Enter") {
    onclick_btn();
}
}); 