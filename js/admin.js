function onclick_btn(table,method){

    const obj = {
        table: `${table}`
    };

    const data = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
    };

    async function send(data){
        const res = await fetch('/LMS/php/admin.php',data);
        const ans = await res.text();
        if(ans == false){
            alert("データを受け取れませんでした");
        }else{
            if (method == "json") {
                json_data = JSON.parse(ans);
                
                if (table == "books") {
                    json_object = {"books": json_data};
                } else if (table == "users") {
                    json_object = {"users": json_data};
                }

                const json = JSON.stringify(json_object);

                const blob = new Blob([json], { type: 'application/json' });
                
                //<a href="window.URL.createObject(blob)" download="test.json">
                //を作ってクリックさせたい

                // ダミーの a 要素を生成して body 要素の最後に追加
                let dummy_a_el = document.createElement('a');
                document.body.appendChild(dummy_a_el);
               
                // a 要素の href 属性に Object URL をセット
                dummy_a_el.href = window.URL.createObjectURL(blob);
               
                // a 要素の download 属性にファイル名をセット
                dummy_a_el.download = `${table}.json`;
               
                // 疑似的に a 要素をクリックさせる
                dummy_a_el.click();
               
                // a 要素を body 要素から削除
                document.body.removeChild(dummy_a_el);
            } else if (method == "csv") {
                json_data = JSON.parse(ans);

                let string = "";
                let con = 1;
                for (let item in json_data[0]) {
                    if (con == Object.keys(json_data[0]).length) {
                     string += '"' + item + '"' + "\n";
                    } else {
                     string += '"' + item + '"' + ",";
                     con += 1;
                    }  
                 }

                for(let i = 0;json_data.length > i; i++) {
                    let con_ = 1;
                    for (let item in json_data[i]) {
                       if (con_ == Object.keys(json_data[i]).length) {
                        string += '"' + json_data[i][item] + '"' +"\n";
                       } else {
                        string += '"' + json_data[i][item] + '"' + ",";
                        con_ += 1;
                       }  
                    }
                }

                const blob = new Blob([string],{type: 'text/csv'});

                let dummy_a_el = document.createElement('a');
                document.body.appendChild(dummy_a_el);
                
                dummy_a_el.href = window.URL.createObjectURL(blob);

                dummy_a_el.download = `${table}.csv`;

                dummy_a_el.click();

            } else if (method == "xml") {
                json_data = JSON.parse(ans);

                let string = '<?xml version="1.0" encoding="UTF-8" ?><books>';

                for(let i = 0;json_data.length > i; i++) {
                    let con = 1;
                    for (let item in json_data[i]) {

                        let value = json_data[i][item];
                        value = value.replace(/&/g,'&amp;');
                        value = value.replace(/</g,'&lt;');
                        value = value.replace(/>/g,'&gt;');
                        value = value.replace(/"/g,'&quot;');

                        if (con == 1) {
                            string += `<book><${item}>${value}</${item}>`;
                            con += 1;
                        } else if (con == Object.keys(json_data[i]).length) {
                            string += `<${item}>${value}</${item}></book>`;
                        } else {
                            string += `<${item}>${value}</${item}>`;
                            con += 1;
                        }  
                    }
                }

                string += '</books>'

                const blob = new Blob([string],{type: 'text/xml'});

                let dummy_a_el = document.createElement('a');
                document.body.appendChild(dummy_a_el);
                
                dummy_a_el.href = window.URL.createObjectURL(blob);

                dummy_a_el.download = `${table}.xml`;

                dummy_a_el.click();
            }
    }}

    send(data);
}