# 第18回BSS（TwitterのbotをPythonで作ってみる。 前編)

日時　：2020年9月30日(水)  
参加者：有川(発表者) ・古川・森  

---
## 今回の趣旨
- TwitterのbotをPythonで作ってみる。

## 目次
1. [Twitter Developerに登録](#1-Twitter-Developerに登録)  
2. [bot本体作成](#2-bot本体作成)  
3. [実行](#3-実行)

## 1. Twitter Developerに登録

Twitterアカウントを作成した後↓から登録し、APIキーを取得する。  
https://developer.twitter.com/en/docs/twitter-api/getting-started/guide

※参考サイト  
https://www.itti.jp/web-direction/how-to-apply-for-twitter-api/


## 2. bot本体作成

### ■ 認証定義作成
Twitter Develperサイトで取得したAPIキーを定義したPythonファイルを作成します。

<<credential.py>>
```python
CONSUMER_KEY        = '#######' # Twitter Developerサイトで取得した値をそれぞれ設定する。
CONSUMER_SECRET     = '#######'
ACCESS_TOKEN_KEY    = '#######'
ACCESS_TOKEN_SECRET = '#######'
```

### ■ 本体作成    
<<yunbot.py>>
```python
#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from credential import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET
from requests_oauthlib import OAuth1Session
from http import HTTPStatus
from datetime import datetime

# Tweet投稿メソッド
def post_tweet(body):
    # 認証処理 Twitter Developerサイトで取得したKeyを指定
    twitter = OAuth1Session(
        CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET
    )
    # ツイート処理
    res = twitter.post("https://api.twitter.com/1.1/statuses/update.json", params={"status": body})
    print(res)

    # エラー処理
    if res.status_code == HTTPStatus.OK:
        print("Successfuly posted")
    else:
            print(f"Failed: {res.status_code}")

# メインメソッド
def main():
    body = datetime.datetime.now() # 現在日時をTweet
    post_tweet(body)


if __name__ == '__main__':
    main()
```
## 3. 実行
ターミナルから実行
```sh
$ python yunbot.py
```

### 実行結果
<img width="628" alt="スクリーンショット 2020-10-20 19 26 40" src="https://user-images.githubusercontent.com/66286964/96574453-6fba1980-130a-11eb-90a3-e4e254d50a70.png">

後編につづく。