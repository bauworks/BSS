# 第26回BSS（Node-REDを使って特定ユーザのTweetを監視する 後編)

日時　：2020年 11月25日(水)  
参加者：有川(発表者) ・古川 ・森 

---
## 今回の趣旨
- 特定ユーザのTweetをトリガーにローカルのプログラム(yunbot)を起動する

## 目次
1. [DockerにNode-REDとPythonの実行環境を作成](#1)  
2. [Node-REDのTweet監視用パレットからyunbotを起動](#2)  

## 1. DockerにNode-REDとPythonの実行環境を作成<a id="1"></a>

### Dockerfile
```Dockerfile
# base image
FROM node

ARG project_dir=/work

# workdir
# なければ新規作成
WORKDIR $project_dir/


RUN apt-get update
RUN apt-get install -y vim
RUN apt-get install -y sudo


RUN apt-get update
#RUN apt-get install -y npm

# upgrade pip
RUN sudo apt-get install -y python3-pip

RUN pip3 install --upgrade pip
RUN pip install -r requirements.txt

RUN sudo npm install -g --unsafe-perm node-red
```

### docker-compose.yml
```yml
version: '3'

services:
    node-srv:
        container_name: noderedsrv
        build: .
        tty: true
        volumes:
            - ../Python/bot:/work
        ports:
            - "1880:1880"
        environment:
            TZ: Asia/Tokyo
```

イメージ作成
```sh
$ docker-compose up -d
```

## 2. Node-REDのTweet監視用パレットからyunbotを起動<a id="2"></a>

### Tweet監視用ノードとyunbot実行用ノードをつなげる

・画面左のノード一覧から[exec]ノードを画面上にD&D  
・[exec]ノードの設定にyunbotの実行コマンドを記載
```sh
$ python /work/yunbot.py
```  
・Tweet監視用ノードと[exec]ノードを結ぶ
