# Python＆Docker開発環境構築

日時　：2020年9月9日(水)  
参加者：森(発表者)・古川・有川  

---

## 今回の趣旨
Python + Flask をDockerコンテナ上にのせてデバックできるよう  
開発環境をコンテナ上に作成する。

## 目次
1. [Flaskアプリをdocker上で動かしてみる](#1-Flaskアプリをdocker上で動かしてみる)
2. [vscodeのRemote Developmentでデバッグしてみる](#2-vscodeのRemote-Developmentでデバッグしてみる)

## 環境
- MacOS
- VSCode
- Docker

---
## 1. Flaskアプリをdocker上で動かしてみる

まずはDocker上にPythonやらFlaskやらをインストールし、  
ソースを置いて実行してホストPCからアクセスしてみる。

### ■ ディレクトリ構成

```
flask_hello_world
  ├── docker-compose.yml
  ├── Dockerfile
  ├── requirements.txt
  └── run.py
```

### ■ Dockerfile
```docker
# base image
FROM python:3.8.5

ARG project_dir=/work/

# workdir にファイル等追加
ADD run.py $project_dir
ADD requirements.txt $project_dir

# workdir
# なければ新規作成
WORKDIR $project_dir

# upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# port
EXPOSE 5000

ENV PYTHONPATH "${PYTHONPATH}:/code/"
ENV FLASK_APP "/run.py"
```

### ■ docker-compose.yml

Dockerイメージのビルド情報やコンテナ起動時の情報などを定義するファイル
```yaml
version: '3'

services:
    web:
        container_name: hello_flask
        build: .
        ports:
            - "5000:5000"
        tty: true
        environment:
            TZ: Asia/Tokyo
        command: flask run --host 0.0.0.0 --port 5000
```

### ■ requirements.txt

インストールしたいパッケージやバージョンを指定する。

```sh
flask

# バージョンまで指定する場合
# flask == 1.1.2
```

`pip freeze` で現在の環境にインストールされたパッケージと  
バージョンを確認することができる。  
よって下記を実行してそのままファイルへ書き出し
```
$ pip freeze > requirements.txt
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
```

### ■ コンテナを起動
```
$ docker-compose up -d
```

### ■ 動作確認

ブラウザから下記にアクセス

http://localhost:5000

http://localhost:5000/hello/{name}  
※ {name} の部分はご自由に置き換えてください。


## 2. vscodeのRemote Developmentでデバッグしてみる

<img width="686" 
     alt="bss_the15_01" 
     src="https://user-images.githubusercontent.com/38059866/92579429-25d02380-f2c8-11ea-9573-fac5a0338fdf.png">
<img width="1136" 
     alt="bss_the15_02" 
     src="https://user-images.githubusercontent.com/38059866/92579433-27015080-f2c8-11ea-8360-f9fe33f20ba7.png">
<img width="1136" 
     alt="bss_the15_03" 
     src="https://user-images.githubusercontent.com/38059866/92579438-2799e700-f2c8-11ea-9000-600aecb70c7e.png">
<img width="1178" 
     alt="bss_the15_04" 
     src="https://user-images.githubusercontent.com/38059866/92579444-28327d80-f2c8-11ea-9d33-f6d665fb2fae.png">
<img width="590" 
     alt="bss_the15_05" 
     src="https://user-images.githubusercontent.com/38059866/92579446-28cb1400-f2c8-11ea-94f8-ed2170f8196b.png">
<img width="1136" 
     alt="bss_the15_06" 
     src="https://user-images.githubusercontent.com/38059866/92579448-28cb1400-f2c8-11ea-8757-28a02f3f1367.png">
<img width="314" 
     alt="bss_the15_07" 
     src="https://user-images.githubusercontent.com/38059866/92579449-2963aa80-f2c8-11ea-9fcd-fdc3cd08b16e.png">
<img width="1144" 
     alt="bss_the15_08" 
     src="https://user-images.githubusercontent.com/38059866/92579452-29fc4100-f2c8-11ea-8276-6a8e3a49719b.png">
<img width="1107" 
     alt="bss_the15_09" 
     src="https://user-images.githubusercontent.com/38059866/92579453-29fc4100-f2c8-11ea-9a56-33d6fd4a767b.png">
<img width="1144" 
     alt="bss_the15_10" 
     src="https://user-images.githubusercontent.com/38059866/92579456-2a94d780-f2c8-11ea-84c8-24bf5fb975b3.png">
<img width="1144" 
     alt="bss_the15_11" 
     src="https://user-images.githubusercontent.com/38059866/92579457-2a94d780-f2c8-11ea-8a8b-58fcffd82844.png">
