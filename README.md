# LibraryManagementSystem

### 開発環境
OS : CentOS Stream 8</br>
Webサーバ : Apache 2.4.37</br>
バックエンド言語 : PHP 7.4.30</br>
DBMS : MariaDB 10.3.28</br>

### データベースの構造
lms_db データベース

1. books テーブル

|カラム名|isbn|title|author|publisher|img|pubdate|description|user|regidate|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|内容|ISBNコード|タイトル|著者名|出版社|書影のURL|出版日|説明|登録者|登録日
|データ型|varchar(13)|longtext|text|text|text|text|longtext|text|text|

なおユーザー登録毎にカラム名を登録したユーザー名とし、データ型を boolean としたカラムを追加している。(既読・未読の管理)

2. users テーブル

|カラム名|user|pass|admin|
|:---:|:---:|:---:|:---:|
|内容|ユーザー名|パスワード|管理者権限|
|データ型|varchar(100)|text|boolean|