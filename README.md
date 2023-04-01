# LibraryManagementSystem

### データベースの構造
1. booksテーブル

|カラム名|isbn|title|author|publisher|img|pubdate|description|user|regidate|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|内容|ISBNコード|タイトル|著者名|出版社|書影のURL|出版日|説明|登録者|登録日
|データ型|varchar(13)|longtext|text|text|text|text|longtext|text|text|

2. usersテーブル

|カラム名|user|pass|admin|
|:---:|:---:|:---:|:---:|
|内容|ユーザー名|パスワード|管理者権限|
|データ型|varchar(100)|text|boolean|