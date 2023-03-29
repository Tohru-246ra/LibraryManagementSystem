function get_info_by_openbd(_isbn) {
    const url = "https://api.openbd.jp/v1/get?isbn="+_isbn+"&pretty";
    
    fetch(url)
    .then(function(res) {
        return res.text();
    })
    .then(function(text) {

        //[{…}]をtext形式で受け取る,isbnがないものは[null]が帰ってくる 
        const json_list = JSON.parse(text);
        const json = json_list[0];

        //{…} or null
        if (json == null) {
            get_info_by_googleapi(_isbn);
        } else {
            try {
                isbn = json["summary"]["isbn"];
            } catch (err) {
                isbn = null;
            }

            try {
                title = json["summary"]["title"];
            } catch (err) {
                title = null;
            }

            try {
                author = json["onix"]["DescriptiveDetail"]["Contributor"][0]["PersonName"]["content"];
            } catch (err) {
                autohr = null;
            }

            try {
                publisher = json["summary"]["publisher"];
            } catch (err) {
                publisher = null;
            }

            try {
                img = json["summary"]["cover"];
            } catch (err) {
                img = null;
            }

            try {
                const pubdate_raw = json["summary"]["pubdate"];
                pubdate = pubdate_raw.slice(0,4)+"-"+pubdate_raw.slice(4,6)+"-"+pubdate_raw.slice(6,8);
            } catch (err) {
                pubdate = null;
            }
            
            try {
                description = json["onix"]["CollateralDetail"]["TextContent"][0]["Text"];
            } catch (err) {
                description = null;
            }

            const read = document.getElementById("form-isbn").read.value;

            send_info(isbn,title,author,publisher,img,pubdate,description,read);
        }
    })
}

function get_info_by_googleapi(_isbn){
    const url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"+_isbn;

    fetch(url)
    .then(function(res){
        return res.text();
    })
    .then(function(text){

        //{…}をtext形式で受け取る
        const json = JSON.parse(text);

        //isbnがない場合はjsonのtotalItemsの値が0となる(ある場合は1)
        if (json["totalItems"] == 0) {
            const _isYes = confirm("書籍情報を取得できませんでした\n手入力しますか？");
            
            if(_isYes) {
                const promise = new Promise(() => {
                    const form_mani = document.getElementById("form-mani");
                    form_mani.style.display = 'block';
    
                    const form_isbn = document.getElementById("form-isbn");
                    form_isbn.style.display = 'none';
    
                    document.getElementById("isbn-copy").innerHTML = _isbn;
    
                    const title = document.getElementById("title").value;
                    const author = document.getElementById("author").value;
                    const publisher = document.getElementById("publisher").value;
                    const img = document.getElementById("img").value;
                    const pubdate = document.getElementById("pubdate").value;
                    const description = document.getElementById("description").value;
                    const read = form_mani.read.value;
                })
                .then(() => {
                    send_info(isbn,title,author,publisher,img,pubdate,description,read);
                });
            }
        } else {

            try {
                isbn = json["items"][0]["volumeInfo"]["industryIdentifiers"][1]["identifier"];
            } catch (err) {
                isbn = null;
            }
            
            try {
                title = json["items"][0]["volumeInfo"]["title"];
            } catch (err) {
                title = null;
            }
       
            try {
                author = json["items"][0]["volumeInfo"]["authors"];
            } catch (err) {
                author = null;
            }
            
            const publisher = null;

            try {
                img = json["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];
            } catch (err) {
                img = null;
            }

            try {
                pubdate = json["items"][0]["volumeInfo"]["publishedDate"];
            } catch (err) {
                pubdate = null;
            }
           
            try {
                description = json["items"][0]["volumeInfo"]["description"];
            } catch (err) {
                description = null;
            }
            
            const read = document.getElementById("form-isbn").read.value;

            send_info(isbn,title,author,publisher,img,pubdate,description,read);
        }
    })
}

function send_info(isbn,title,author,publisher,img,pubdate,description,read) {
    // const element_user = document.getElementById("select");
    // const user = element_user.value;

    //ログイン中のユーザーを取得
    const cookieItems = document.cookie.split(';');

    const cookie_obj = {};

    cookieItems.forEach((item) => {
        var elem = item.split('=');
        const key = elem[0].trim(); //trim関数で不用なスベースを削除
        const val = decodeURIComponent(elem[1]); //URI形式でエンコードされた文字列をデコード
        cookie_obj[key] = val;
    });

    const user = cookie_obj["user_name"];

    // 年月日を取得
    const date = new Date();

    const year = date.getFullYear();

    let month = date.getMonth()+1;
    if (month < 10) {
        month = "0" + month;
    }

    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    let hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }

    let minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }

    let second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }

    //Dublin Core
    const ymd = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;

    const obj = {
        isbn: `${isbn}`,
        title: `${title}`,
        author: `${author}`,
        publisher: `${publisher}`,
        img: `${img}`,
        pubdate: `${pubdate}`,
        description: `${description}`,
        user: `${user}`,
        regidate: `${ymd}`,
        read: `${read}`
    };

    const isYes = confirm(`『${title}』を登録します\nよろしいですか？`);

    if (isYes) {

        const data = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(obj)
        };
    
        async function send(data){
            const res = await fetch('/LMS/php/register_book.php',data);
            const ans = await res.text();
    
            if (ans == true) {
                alert(`『${title}』 の登録に成功しました`);
                element_isbn.value = "";
            } else if (ans == `Duplicate entry '${isbn}' for key 'isbn'`) {
                alert(`『${title}』 は既に登録してあります`);
            } else {
                alert("登録に失敗しました");
            }
        }
    
        send(data);
    } else {
        alert("登録を中止しました");
    }
}

function onclick_btn() {
    element_isbn = document.getElementById("isbn");
    const isbn = element_isbn.value;

    if (isbn == "") {
        alert("ISBNコードを入力してください");
        return 0;
    } else {
        get_info_by_openbd(isbn);
        return 1;
    }

    // const register = document.getElementById("register");
    // register.disabled = true;
}

// // 以下でユーザー名をデータベースから取ってきている

// const select = document.getElementById("select");

// fetch('/LMS/php/get_user.php')
// .then(function(res) {
//     return res.json();
// })
// .then(function(json) {
//     const cookieItems = document.cookie.split(';');

//     const obj = {};

//     cookieItems.forEach((item) => {
//         var elem = item.split('=');
//         const key = elem[0].trim(); //trim関数で不用なスベースを削除
//         const val = decodeURIComponent(elem[1]); //URI形式でエンコードされた文字列をデコード
//         obj[key] = val;
//     });

//     const login_user = obj["user_name"];

//     //ログイン中のユーザーを一番上へ
//     let option = "<option value='"+login_user+"'>"+login_user+"</option>";
    
//     json.forEach((value) => {
//         var item_value = value["user"];
//         if (item_value == login_user) {
//             return;
//         } else {
//             option += "<option value='"+item_value+"'>"+item_value+"</option>";
//             select.innerHTML = option;
//         }
//     })
// })

//以下でEnterキーを押すことで登録できるようにしている

element_isbn = document.getElementById("isbn");

element_isbn.addEventListener("keydown",(e) => {
    if(e.key == "Enter") {
      onclick_btn();
    }
  });
