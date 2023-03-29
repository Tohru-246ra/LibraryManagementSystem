const new_books = document.getElementById("new-books");
const sum = document.getElementById("sum");
const user_books = document.getElementById("user-books");
const info_2 = document.getElementById("book-info-2");

const cookieItems = document.cookie.split(';');

const cookie_obj = {};

cookieItems.forEach((item) => {
    var elem = item.split('=');
    const key = elem[0].trim();
    const val = decodeURIComponent(elem[1]);
    cookie_obj[key] = val;
});



let obj = {};

if (cookie_obj["user_name"]) {
  user_books.style.display = "flex";
  info_2.style.display = "block";

  obj['user'] = cookie_obj["user_name"];;
}

const data = {
  method: 'POST',
  headers: {
      'Content-Type':'application/json'
  },
  body: JSON.stringify(obj)
};

fetch('/LMS/php/make_index.php',data)
.then((res) => {
    return res.json();
})
.then((json) => {

    let string1 = "";
    let string2 = "";

    book_info = [];

    for (let i = 0; i < json.length; i++) {
      if (i == 0) {
        sum.innerHTML = "現在の登録書籍数 : " + json[i]["sum"];
      } else if (i == 1) {
        json[i].forEach((value) => {
              book_info.push([value["isbn"],value]);
  
              string1 += `<div class="new-book" onclick='onclick_btn_make_index(${value["isbn"]})'><img src=` + value["img"] + "></div>";
        });
      } else if (i == 2) {
        json[i].forEach((value) => {
          book_info.push([value["isbn"],value]);

          string2 += `<div class="user-book" onclick='onclick_btn_make_index(${value["isbn"]})'><img src=` + value["img"] + "></div>";
        });
      }
    } 

    new_books.innerHTML = string1;
    user_books.innerHTML = string2;
});

function onclick_btn_make_index(isbn) {
    const modal = document.getElementById("easyModal");
    const modal_content = document.getElementById("modal-content")
  
    //ユーザーごとの既読/未読を出すためにCookieからユーザー情報を取得
    const cookieItems = document.cookie.split(';');
  
    const obj = {};
  
    cookieItems.forEach((item) => {
        var elem = item.split('=');
        const key = elem[0].trim();
        const val = decodeURIComponent(elem[1]); 
        obj[key] = val;
    });
  
    let value = "";

    for (let i = 0; i < book_info.length; i++) {
      if (book_info[i][0] == isbn) {
        value = book_info[i][1];
      }
    } 
  
    result_string = "<div class='modal-info'>";
  
    if (value["img"] == "" || value["img"] == null || value["img"] == 'null'){
      result_string += `\
      <img src="/LMS/image/no_image.jpg">`;
    } else {
      result_string += `\
      <img src="${value["img"]}">`;
    }
  
    result_string += `\
        <div class="modal-book-info">\
          <p>書名 : ${value["title"]}</p>\
          <p>著者 :  ${value["author"]}</p>\
          <p>出版社 :  ${value["publisher"]}</p>\
          <p>出版日 :  ${value["pubdate"]}</p>\
          <p>登録ユーザー :  ${value["user"]}</p>\
          <p>登録日時 :  ${value["regidate"]}</p>\
          `;
          
    if (obj["user_name"]) {
      if (value[obj["user_name"]] == 1){
        result_string += '<p>既読/未読 : <span style="color:#00F;">既読</span></p>';
      } else {
        result_string += '<p>既読/未読 : <span style="color:#F00;">未読</span></p>';
      }
    }
  
    result_string += `\
    <p>ISBN :  ${value["isbn"]}</p></div>\
    <form action='/LMS/html/edit.php' method='post' class='edit-form'>\
    <p class="modalClose">×</p>\
    <input type='hidden' name='isbn' value='${value["isbn"]}'>`;

    if (obj["user_name"]) {
      result_string += `<input type='submit' value='編集' class='edit'>`;
    }    

    result_string +=`
        </form></div>\
        &nbsp&nbsp&nbsp&nbsp&nbsp説明 : </br>
        <div class="modal-description">\
          ${value["description"]} \
        </div>\
        `;
  
    modal_content.innerHTML = result_string;
  
    modal.style.display = 'block';
  
    const buttonClose = document.getElementsByClassName('modalClose')[0];
  
    buttonClose.addEventListener('click',() => {
      modal.style.display = 'none';
    });
    
    addEventListener('click',(e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  
  }

const new_books_ = document.querySelector(".new-books");

new_books_.addEventListener("mouseover",() => {
    new_books_.classList.add("show");
});

const user_books_ = document.querySelector(".user-books");

user_books_.addEventListener("mouseover",() => {
    user_books_.classList.add("show");
});
