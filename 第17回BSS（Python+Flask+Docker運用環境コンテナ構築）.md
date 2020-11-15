# Python+Flask+Docker運用環境コンテナ構築

日時　：2020年9月23日(水)  
参加者：森(発表者)・古川  

---

## 今回の趣旨
今回はFlaskアプリやサービスを作って公開する場合の運用環境のコンテナを構築する。

## 目次
1. [まずは](#1-まずは)
2. [ディレクトリ構成](#2-ディレクトリ構成)
3. [App Server](#3-App-Server)
4. [Web Server](#4-Web-Server)
5. [docker-compose.yml](#5-docker-compose.yml)
6. [コンテナ起動して動作確認](#6-コンテナ起動して動作確認)

## 環境
- macOS Catalina 10.15.6
- VSCode 1.48.2
- Docker 19.03.12
- Docker Compose 1.27.2

---
## 1. まずは

第15回で作ったコンテナをそのままどこかのクラウドサービスへ  
デプロイしたらダメなの？というところですが  
[公式ドキュメント](https://flask.palletsprojects.com/en/1.1.x/tutorial/deploy/)では以下のように書かれている。  

> When running publicly rather than in development,
> you should not use the built-in development server (\``flask run``).
> The development server is provided by Werkzeug for convenience,
> but is not designed to be particularly efficient, stable, or secure.
> 
> Instead, use a production WSGI server.

とのこと。  
flask runで実行した開発サーバーを本番環境で使用するべきではない。  
効率性、安定性、セキュリティを意識して設計してはいない。  

代わりに本番環境ではWSGIサーバーを使う。  

ということで、WebサーバーとAppサーバーを用意し  
WebサーバーとFlaskを繋ぐインターフェース  
WSGI (Web Server Gateway Interface) を利用して
通信する環境をコンテナで作成していく。  

今回使用するWSGIサーバーはuWSGI。  
Flask + Docker + Nginx + uWSGI で環境を作っていく。  

※ WSGIは「ウィズギー」と読む。  

## 2. ディレクトリ構成

```
flask-product
  ├── app
  │ ├── Dockerfile
  │ ├── requirements.txt
  │ ├── run.py
  │ └── uwsgi.ini
  ├── web
  │ ├── Dockerfile
  │ └── nginx.conf
  └── docker-compose.yml
```

## 3. App Server

### ■ Dockerfile

[前回](https://github.com/bauworks/BSS/blob/master/%E7%AC%AC15%E5%9B%9EBSS%EF%BC%88Python%EF%BC%86Docker%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89%EF%BC%89.md)との差異。  
`WORKDIR`を変更し、`CMD`を追加

```docker
# base image
FROM python:3.8.5

ARG project_dir=/var/www/

# workdir にファイル等追加
COPY requirements.txt $project_dir

# workdir
WORKDIR $project_dir

# upgrade pip
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]
```

※追加した`CMD`は、 docker-compose.ymlに下記を追加しても問題ない（はず）。

```yaml
command: uwsgi --ini /var/www/uwsgi.ini
```

### ■ requirements.txt

```sh
Flask
uwsgi
```

### ■ run.py

```py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello Flask!"

@app.route("/hello/<name>")
def hello_someone(name):
    return "Hello " + name + " !"

if __name__ == "__main__":
    app.run()
```

### ■ uwsgi.ini

uWSGIの設定ファイル

```ini
[uwsgi]
#flaskのプログラム
wsgi-file = run.py
callable = app
master = true
#uWSGIの最大ワーカープロセス数
processes = 1
socket = :3031
#chmod-socket = 666
#vacuum = true
#die-on-term = true
#py-autoreload = 1
```

## 4. Web Server

### ■ Dockerfile

公式イメージをベースとする

```docker
# base image
FROM nginx:latest

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]
```

### ■ nginx.conf

Nginxの設定ファイル

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    upstream uwsgi {
        server app-server:3031;
    }

    server {
        listen 80;
        charset utf-8;

        location / {
            include uwsgi_params;
            uwsgi_pass uwsgi;
        }

    }
}
```

ホスト名にはdocker-compose.ymlで指定したapp側のホスト名を指定

## 5. docker-compose.yml

コンテナをapp-serverとweb-serverの２つに分ける。
ホスト名も忘れずに設定。

```yaml
version: "3"

services:
    app:
        container_name: app-server
        hostname: app-server
        build: ./app
        volumes:
            - "./app:/var/www/"
        ports:
            - "3031:3031"
        environment:
            TZ: Asia/Tokyo
  
    web:
        container_name: web-server
        hostname: web-server
        build: ./web
        volumes:
            - "./web/nginx.conf:/etc/nginx/nginx.conf"
            # nginxのログをホストOS側に出力
            - "/tmp/nginx_log:/var/log/nginx"
        links:
            - app
        ports:
            - "4231:80"
        environment:
            TZ: Asia/Tokyo
```

## 6. コンテナ起動して動作確認

```
$ docker-compose up -d
```

コンテナが起動すればブラウザから下記にアクセス。

http://localhost:4231

運用環境用のコンテナができました。