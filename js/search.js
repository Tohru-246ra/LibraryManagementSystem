const cookieItems = document.cookie.split(';');
  
const obj = {};

cookieItems.forEach((item) => {
    var elem = item.split('=');
    const key = elem[0].trim();
    const val = decodeURIComponent(elem[1]); 
    obj[key] = val;
});

if (obj["user_name"]) {
  user = obj["user_name"];
  document.querySelector(".check-box").style.display = 'block';
  document.getElementById("my-books-label").innerHTML = `${user} の書籍`;
} else {
  user = "";
}

function onclick_btn1(){
  let checknum = 0;
  if (user) {
    const check1 = document.getElementById("my-books").checked
    const check2 = document.getElementById("read").checked
    const check3 = document.getElementById("not-read").checked

    if (check1) {
      checknum += 1;
    } 
    if (check2) {
      checknum += 2;
    }
    if (check3) {
      checknum += 4;
    }
  }
 
  element_search_word = document.getElementById("search-word");
  const search = element_search_word.value;

  const pattern = /[。、/=.,・＝ 　]+/;

  const _search = search.trim();

  const search_list = _search.split(pattern); 

  let search_word = "";

  for (let i = 0; i < search_list.length; i++) {
    search_word += search_list[i];
  }

  let obj = {
              user: `${user}`,
              checknum: `${checknum}`,
              search_word: `${search_word}`
            };

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
      const results = document.getElementById("results");
      const book_num_element = document.getElementById("book-num"); 

      var result_string = "";

      if (json[0] == null) {
          alert("書籍が見つかりませんでした");
      } else{
          let book_num = 0;

          book_info = [];

          json.forEach((value) => {
            book_info.push([value["isbn"],value]);
            
            if (value["img"] == "" || value["img"] == null || value["img"] == "null") {
              result_string += `<div class="result" onclick="onclick_btn2(${value["isbn"]})">\
              <img src="/LMS/image/no_image.jpg">`;
            } else {
              result_string += `<div class="result" onclick="onclick_btn2(${value["isbn"]})">\
              <img src="${value["img"]}">`;
            }

            if (value["title"].length > 14) {
              title = value["title"].slice(0,14) + " …";
            } else {
              title = value["title"];
            }

            result_string += `\
                  <div>
                  <p class="title">${title}</p>\
                  <p class="author">${value["author"]}</p>
                  </div>
                  </div>
                  `;

            book_num +=1;
          })

          results.innerHTML = result_string;
          book_num_element.innerHTML = `該当する書籍が ${book_num}冊 みつかりました！！`;
      }  
  }

  send(data);
}

function onclick_btn2(isbn) {
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

let element_search_word = document.getElementById("search-word");

element_search_word.addEventListener("keydown",(e) => {
  if(e.key == "Enter") {
    onclick_btn1();
  }
});