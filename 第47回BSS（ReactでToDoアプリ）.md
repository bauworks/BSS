# 第47回BSS（ReactでToDoアプリ）

日時　：2021年 ５月26日(水)  
参加者：古川(発表者)・有川

---
***今回の趣旨***
* Reactを使ってToDoアプリを作る
  
***目次***
- [第47回BSS（ReactでToDoアプリ）](#第47回bssreactでtodoアプリ)
  - [1. ToDoアプリを作成（React）](#1-todoアプリを作成react)
  - [1.1 データベースの準備](#11-データベースの準備)
  - [1.2 Webサービスの準備](#12-webサービスの準備)
  - [1.2 ソースコード](#12-ソースコード)
  - [1.3 ToDoアプリを起動](#13-todoアプリを起動)
  - [1.4 動作確認](#14-動作確認)
  - [2. 参考サイト](#2-参考サイト)


## 1. ToDoアプリを作成（React）

## 1.1 データベースの準備

第46回で作成したDBをそのまま使います。

## 1.2 Webサービスの準備

第46回で作成したJava版ToDoアプリ内に実装されているサービスを使います。


## 1.2 ソースコード
開発環境はDockerのnodeコンテナ内でcreatet-react-appで作成。（第13回BSSを参照）
ソースコードはAdditionalを参照ください。（第46回分としてアップ）
```sh
46/react-todo/reactapp/src
```

## 1.3 ToDoアプリを起動
```sh
$ cd react-todo
$ docker-compose up -d
```

## 1.4 動作確認
```
http://localhost:3000/
```
※ 1.1, 1.2, 1.3のすべてのDockerコンテナが起動していること


![ToDoアプリのスクリーンショット](https://user-images.githubusercontent.com/19363285/121779926-02306580-cbd9-11eb-9de3-afc2c2057bff.png)


## 2. 参考サイト
- [React入門 未経験から1週間でReactをマスターする](https://qiita.com/yassun-youtube/items/2ae26050efd2133c2286)