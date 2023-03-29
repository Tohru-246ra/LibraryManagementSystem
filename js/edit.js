function onclick_btn1() {
    element_search_word = document.getElementById("search-word");
    const search_word = element_search_word.value;
    
    //検索ワードを全て分解した文字列の配列を取得
    const pattern = /[。、/=.,・＝ 　]+/;

    const search_list = search_word.split(pattern); 
    
    //検索ワードを全て繋げた文字列を取得
    let raw_search_word = "";

    for (let i = 0; i < search_list.length; i++) {
      raw_search_word += search_list[i];
    }
  
    let obj = {search_word: `${raw_search_word}`};
  
    for (let i = 0; i < search_list.length; i++) {
      obj[`search${i}`] = search_list[i];
    }

    const data = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
    };

    async function send(data){
        const res = await fetch('/LMS/php/search.php',data);
        const json = await res.json();

        const select = document.getElementById("select");

        var result_string = "<p>登録内容を編集する書籍を選んでください</p>";
        
        if (json[0] == null){
            alert("書籍が見つかりませんでした");
        } else{
            json.forEach((value) => {

                result_string += "<label class='select-item'><input type='radio' name='book_select' value='"+value["isbn"]+"'/> "
                    +value["title"]+"</label></br></br>"
            })

            result_string += '<input type="button" value="決定" id="decision" onclick="onclick_btn2()">';
            select.innerHTML = result_string; 
        } 

               
    }

    send(data);
}

function onclick_btn2(isbn) {

    if (!isbn) {
        const element_select = document.getElementById("select");

        //グローバル変数
        search = element_select.book_select.value;
    } else {
        search = isbn;
    }
    
    const obj = {
        search: `${search}`
    };

    const data = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
    };

    async function send(data){
        const res = await fetch('/LMS/php/search.php',data);
        const json = await res.json();

        const title = document.getElementById("title"); 
        const author = document.getElementById("author");
        const publisher = document.getElementById("publisher");
        const img = document.getElementById("img");
        const description = document.getElementById("description");
        const pubdate = document.getElementById("pubdate");

        read = document.getElementById("read");
        not_read = document.getElementById("not-read");

        let cookieItems = document.cookie.split(';');

        let cookie_obj = {};

        cookieItems.forEach((item) => {
            var elem = item.split('=');
            const key = elem[0].trim();
            const val = decodeURIComponent(elem[1]);
            cookie_obj[key] = val;
        });

        let login_user = cookie_obj["user_name"];

        read.removeAttribute("checked");
        not_read.removeAttribute("checked");

        title.value = json[0]["title"];
        author.value = json[0]["author"];
        publisher.value = json[0]["publisher"];
        img.value = json[0]["img"];
        description.value = json[0]["description"];
        pubdate.value = json[0]["pubdate"];

        switch(Number(json[0][login_user])) {
            case 0:
                not_read.setAttribute("checked","checked");
                read.removeAttribute("checked");
                break;
            case 1:
                read.setAttribute("checked","checked");
                not_read.removeAttribute("checked");
                break;
        }
    }

    send(data);

    const select_edited_book = document.getElementById("select_edited_book");
    select_edited_book.style.display = "none";
    
    const edit = document.getElementById("edit");
    edit.style.display = "block";
}

function onclick_btn3() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publisher = document.getElementById("publisher").value;
    const img = document.getElementById("img").value;
    const pubdate = document.getElementById("pubdate").value;
    const description = document.getElementById("description").value;
    const read = document.getElementById("edit").read.value;

    let cookieItems = document.cookie.split(';');

    let cookie_obj = {};

    cookieItems.forEach((item) => {
        var elem = item.split('=');
        const key = elem[0].trim();
        const val = decodeURIComponent(elem[1]);
        cookie_obj[key] = val;
    });

    let login_user = cookie_obj["user_name"];

    const obj = {
        isbn: `${search}`,
        title: `${title}`,
        author: `${author}`,
        publisher: `${publisher}`,
        img: `${img}`,
        pubdate: `${pubdate}`,
        description: `${description}`,
        read: `${read}`,
        login_user: `${login_user}`
    };

    const data = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
    };

    async function send(data){
        const res = await fetch('/LMS/php/edit.php',data);
        const ans = await res.text();

        if (ans == true) {
            alert("編集が完了しました");
            location.href = "/LMS/html/edit.php";
        } else {
            alert("編集に失敗しました");
            location.href = "/LMS/html/edit.php";
        }
    }

    send(data);
}

function onclick_btn4() {
    const select_edited_book = document.getElementById("select_edited_book");
    select_edited_book.style.display = "block";

    const edit = document.getElementById("edit");
    edit.style.display = "none";
}

let get_isbn = document.getElementById("get-isbn");

window.addEventListener("load",() => {
    const get_isbn_item = get_isbn.value;
    if (get_isbn_item != "") {
        onclick_btn2(get_isbn_item);
    }
})

let element_search_word = document.getElementById("search-word");

element_search_word.addEventListener("keydown",(e) => {
    if(e.key == "Enter") {
      onclick_btn1();
    }
  });