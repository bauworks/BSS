# 第36回BSS（Herokuで作るデプロイ環境)

日時　：2021年 2月10日(水)  
参加者：古川(発表者)・有川・森

---

## Herokuとは
Heroku（ヘロク）は2007年創業のアメリカ合衆国の企業。また、同社が開発と運営を行っているPaaSの名称でもある。(Wikipedia)

  - 開発したWEBアプリケーションを10分程度で全世界に公開可能。
  - 1サービスであれば実質無料（但し制限あり）
  - メールアドレスだけで登録OK


## クラウドの形態(SaaS, PaaS, IaaS)

```
▲      アプリケーション   ← SaaS
▲▲     ミドルウェア      ← PaaS
▲▲▲    OS              ← IaaS
▲▲▲▲   ハードウェア
▲▲▲▲▲  ネットワーク
```

### SaaS(Software as a Service)
アプリケーションまで完全にサービス化して提供するクラウドサービス

### PaaS(Platform as a Service)
MiddleWare層までを提供するクラウドサービス
具体的には、下記のようなものをボタン１つで稼働させることができます。
  - サーバー
  - OS
  - データベース
  - プログラミング言語の実行に必要な環境

### IaaS(Infrastructure as a Service)
OSレイヤから下を対象に提供するクラウドサービス


## Herokuにサービスをデプロイしてみよう
  1. Herokuの会員登録
  2. PCにHerokuインストール
  3. Herokuにログイン
  4. Herokuにアップロード
  5. URL設定（今回は実施しない）


## 参考
Heroku(Wikipedia)
https://ja.wikipedia.org/wiki/Heroku

SaaS、PaaS、IaaSとは。3分で理解するそれぞれの違いとクラウド基礎知識について
https://www.cloud-ace.jp/column/detail01/

【HEROKUとは】これを読めばOK!デプロイの仕方まで徹底解説
https://tech-camp.in/note/technology/16108/

