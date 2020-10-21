# 第20回BSS（TwitterのbotをPythonで作ってみる。 後編)

日時　：2020年 10月14日(水)  
参加者：有川(発表者) ・古川  

---
## 今回の趣旨
- 第18回で作成したTwitterのbotをDocker上で動かす。

## 目次
1. [botにゆんたく。Tweet生成AI組込み](#1-botにゆんたく。Tweet生成AI組込み)  
2. [Docker上でbotを動かす](#2-Docker上でbotを動かす)  

## 1. botにゆんたく。Tweet生成AI組込み
前編で作成したbotに古川さん作成のTweet生成AIを組み込む

### ディレクトリ構成
```sh
yunbot
  ├── credential.py         　　　　　# Twitter APIKey定義ファイル
  ├── yunbot.py                     # bot本体
  ├── yuntaku_bot.py                # Tweet生成AI本体
  └── yuna8313_threewords.pickle    # Tweet生成用データファイル
```

### <<yunbot.py>>編集
```python
#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from credential import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET
from requests_oauthlib import OAuth1Session
from http import HTTPStatus
from datetime import datetime
import os
import yuntaku_bot


def post_tweet(body):
    # 認証処理
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

def main():

    # カレントディレクトリを実行ファイルの場所に移動
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # tweet生成
    twtext = yuntaku_bot.step3()
    post_tweet(twtext+'。 #yunbot')


if __name__ == '__main__':
    main()
```

### 実行
```sh
$ python yunbot.py
```
<img width="486" alt="スクリーンショット 2020-10-20 19 56 26" src="https://user-images.githubusercontent.com/66286964/96577464-a003b700-130e-11eb-9d07-8c1589b4d5ef.png">

## 2. Docker上でbotを動かす

作成したbotをDocker上で定期実行させる。

### ■ ディレクトリ構成
```sh
yunbot
  ├── credential.py         　　　　　# Twitter APIKey定義ファイル
  ├── yunbot.py                     # bot本体
  ├── yuntaku_bot.py                # Tweet生成AI本体
  ├── yuna8313_threewords.pickle    # Tweet生成用データファイル
  ├── Dockerfile                    # (追加)
  ├── docker-compose.yml            # (追加)
  ├── requirements.txt              # (追加)
  └── yunbot_cron                   # (追加)
```

### ■ Dockerfile
```docker
# base image
FROM python:3.8.5

ARG project_dir=/work

# workdir にファイル追加
ADD requirements.txt $project_dir/

ADD yunbot_cron /etc/cron.d/yunbot_cron
RUN chmod 0644 /etc/cron.d/yunbot_cron

# workdir
# なければ新規作成
WORKDIR $project_dir/

# cronインストール
RUN apt-get update
RUN apt-get install -y cron

# VIインストール
RUN apt-get update
RUN apt-get install -y vim

# upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# cronに設定追加
RUN crontab /etc/cron.d/yunbot_cron
```

### ■ docker-compose.yml
```yml
version: '3'

services:
    botsrv:
        container_name: yunbot
        build: .
        tty: true
        volumes:
            - ./:/work
        environment:
            TZ: Asia/Tokyo
```

### ■ requirements.txt
yunbot.py実行時に必要なパッケージを記載する。
```
beautifulsoup4
oauthlib
soupsieve
tqdm
requests-oauthlib
```

### ■ yunbot_cron
crontabの設定を記載
```sh
* * * * * /usr/local/bin/python3 /work/yunbot.py > /tmp/yunbot.log 2>&1
```

### ■ コンテナを起動

下記コマンドでコンテナを起動

```
$ docker-compose up -d
```

コンテナに入ってcronを実行する。
```sh
$ docker-compose exec botsrv /bin/bash
$ root@18fdc5fc246b:/work# cron
```

### ■ 動作確認
Twetterのサイトで確認

<img width="607" alt="スクリーンショット 2020-10-20 20 21 07" src="https://user-images.githubusercontent.com/66286964/96579440-d1ca4d00-1311-11eb-9e08-c710480ad121.png">
