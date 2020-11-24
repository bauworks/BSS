# 第23回BSS（Node-REDを使って特定ユーザのTweetを監視する 前編)

日時　：2020年 11月4日(水)  
参加者：有川(発表者) ・古川 ・森 

---
## 今回の趣旨
- Node-REDを使って特定ユーザのTweetを監視する。

## 目次
1. [Docker上でNode-REDを実行する](#1)  
2. [Node-REDにTweet監視用のパレットを追加](#2)  

## 1. Docker上でNode-REDを実行する<a id="1"></a>

以下のコマンドを実行する。
```sh
$ docker run -it -p 1880:1880 --name mynodered nodered/node-red
```

http://localhost:1880 にアクセスするとNode-REDのフロー作成画面が起動する。
<img width="1391" alt="スクリーンショット 2020-11-24 19 55 35" src="https://user-images.githubusercontent.com/66286964/100085170-0f7d4100-2e8f-11eb-8c30-9d20167e80a2.png">

## 2. Node-REDにTweet監視用のパレットを追加<a id="2"></a>

### Tweet監視用にパレットを追加

画面右上のメニューからパレットの管理をクリック

<img width="517" alt="スクリーンショット 2020-11-24 20 04 45" src="https://user-images.githubusercontent.com/66286964/100086465-ccbc6880-2e90-11eb-802f-22b846f6c9f3.png">


ノードを追加タブを開き「Twitter」で検索し、「node-red-node-twitter」を追加する。
<img width="1062" alt="スクリーンショット 2020-11-24 20 06 05" src="https://user-images.githubusercontent.com/66286964/100086473-d1811c80-2e90-11eb-8812-0dc95f67ebff.png">

追加すると画面左のノードリストに追加したノードが表示される。
<img width="582" alt="スクリーンショット 2020-11-24 20 06 41" src="https://user-images.githubusercontent.com/66286964/100086494-d8a82a80-2e90-11eb-9c6b-03431d42fccd.png">

「twitter in」ノードを画面中央のエリアにドラッグして配置する。

<img width="742" alt="スクリーンショット 2020-11-24 20 15 02" src="https://user-images.githubusercontent.com/66286964/100087241-c7135280-2e91-11eb-8230-60ba9b4ae1c4.png">

配置したノードをダブルクリックし、設定を入力。  
入力後画面右上のデプロイボタンを押下して公開する。  
※Twitter IDにはDeveloper登録したTwitterのIDを入力(API Key等も必要)
<img width="994" alt="スクリーンショット 2020-11-24 20 07 39" src="https://user-images.githubusercontent.com/66286964/100086506-dc3bb180-2e90-11eb-8b2b-60ae2faf544f.png">

後編につづく。