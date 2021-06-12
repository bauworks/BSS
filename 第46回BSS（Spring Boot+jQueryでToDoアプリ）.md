# 第46回BSS（Spring Boot+jQueryでToDoアプリ）

日時　：2021年 ５月19日(水)  
参加者：古川(発表者)・有川

---
***今回の趣旨***
* Spring Bootを使ってToDoアプリを作る
  
***目次***
- [第46回BSS（Spring Boot+jQueryでToDoアプリ）](#第46回bssspring-bootjqueryでtodoアプリ)
  - [1. ToDoアプリを作成（Spring Boot）](#1-todoアプリを作成spring-boot)
  - [1.1 データベースの準備](#11-データベースの準備)
  - [1.2 ソースコード](#12-ソースコード)
  - [1.3 ビルド ＆ サービス起動](#13-ビルド--サービス起動)
  - [1.4 動作確認](#14-動作確認)
  - [2. 参考サイト](#2-参考サイト)


## 1. ToDoアプリを作成（Spring Boot）

## 1.1 データベースの準備

DockerでPostgreSQLを立ち上げてテーブルを作成する。

```sh
# in HOST-PC
$ cd db-todo
$ docker-compose up -d
$ docker exec -it postgresql /bin/sh
# in postgresql-Container
$ psql -d db-todo -U pguser
[db-todo] create table todo_items(
	id serial,
	title varchar(40),
	done_flg numeric(1) default 0,
	time_limit date
);
```


## 1.2 ソースコード
開発環境は第44回BSSを参照
ソースコードはAdditionalを参照ください。
```sh
46/todo-spbjq/src
```

## 1.3 ビルド ＆ サービス起動
```sh
$ cd todo-spbjq
$ gradlew build
$ cd build/libs
$ java -jar todo-spb-0.0.1-SNAPSHOT.war
```

## 1.4 動作確認
```
http://localhost:8080/
```

![ToDoアプリのスクリーンショット](https://user-images.githubusercontent.com/19363285/121777929-749c4800-cbcf-11eb-969d-46dd401c3659.png)



## 2. 参考サイト
- [SpringBootでToDoアプリを作ってみよう【誰でも作れます・初心者向け】](https://qiita.com/toki_k/items/f9fcdf7d65f3a8ab0f23)
- [SpringBootでToDoアプリを作ってみよう【+jQuery】](https://qiita.com/toki_k/items/e207157c679018579e21)