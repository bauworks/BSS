# Python＆Docker開発環境構築

日時　：2020年9月9日(水)  
参加者：森(発表者)・古川・有川  

---

## 今回の趣旨
Python + Flask をDockerコンテナ上にのせてvscodでデバックできるよう  
開発環境をコンテナ上に作成する。

## 目次
1. [Flaskアプリをdocker上で動かしてみる](#1-Flaskアプリをdocker上で動かしてみる)
2. [vscodeのRemote Developmentでデバッグしてみる](#2-vscodeのRemote-Developmentでデバッグしてみる)

## 環境
- macOS Catalina 10.15.6
- VSCode 1.48.2
- Docker 19.03.12
- Docker Compose 1.26.2

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

Python公式のイメージからDockerイメージを作成

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
よって下記を実行してそのままファイルへ書き出し.

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

下記コマンドでコンテナを起動

```
$ docker-compose up -d
```

### ■ 動作確認

ブラウザから下記にアクセス

http://localhost:5000

http://localhost:5000/hello/{name}  
※ {name} の部分はご自由に置き換えてください。

### ■ コンテナを停止

下記コマンドでコンテナを停止

```
$ docker-compose stop
```

## 2. vscodeのRemote Developmentでデバッグしてみる

### ■ 拡張機能「Remote Development」をインストール

まずは拡張機能をインストール。
  
<img width="850" 
     alt="bss_the15_01" 
     src="https://user-images.githubusercontent.com/38059866/92584233-574bed80-f2ce-11ea-9b56-221055e99404.png">

Extension Packとなっており、インストールすると下記の３つがインストールされる。  
- Remote - WSL
- Remote - Containers
- Remote - SSH

今回はコンテナ上のソースをデバッグするので「Remote - Containers」を使用。

### ■ ディレクトリ構成

```
flask-dev
  ├── .devcontainer
  │ └── devcontainer.json
  ├── .vscode
  │ └── launch.json
  ├── docker-compose.yml
  ├── Dockerfile
  ├── requirements.txt
  └── run.py
```

### ■ Dockerfile

前回と違い、今回は`project_dir`は宣言するだけで、値を指定しない。  

```docker
# base image
FROM python:3.8.5

ARG project_dir

# workdir にファイル等追加
ADD requirements.txt $project_dir

# workdir
# なければ新規作成
WORKDIR $project_dir

# upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
```

### ■ docker-compose.yml

`project_dir`をここで設定。  
`volumes`で作業場にマウント。

```
version: '3'

services:
    web:
        container_name: dev_flask
        build:
            context: .
            args:
                project_dir: "/work/"
        ports:
            - "5000:5000"
        volumes:
            - ".:/work"
        environment:
            TZ: Asia/Tokyo
            FLASK_ENV: "development"
        command: "sleep infinity"
```

### ■ requirements｡txt & run.py

「1. Flaskアプリをdocker上で動かしてみる」のファイルそのまま。

### ■ devcontainer.json を追加

ウィンドウ左下の赤枠をクリック。  
「Remote-container: Add Development Container Configuration Files...」を選択。

<img width="1136" 
     alt="bss_the15_02" 
     src="https://user-images.githubusercontent.com/38059866/93001288-ebd17c80-f568-11ea-9aa9-cb7e812955af.png">

docker-compose.ymlから設定ファイルを作成するため  
「From 'docker-compose.yml'」を選択。

<img width="1136" 
     alt="bss_the15_03" 
     src="https://user-images.githubusercontent.com/38059866/92579438-2799e700-f2c8-11ea-9000-600aecb70c7e.png">

これでdevcontainer.jsonが作成されるので編集する。  
`dockerComposeFile`にyamlファイルが２つ指定されているが、  
一つ上の階層にあるファイルのみ使用するため、  
設定ファイルと同階層にあるdocker-compose.ymlは削除する。

```json
{
	"name": "RemoteDevFlask",
	"dockerComposeFile": [
		"../docker-compose.yml",
		// "docker-compose.yml"
	],
	"service": "web",
	"workspaceFolder": "/work",
	"settings": {
		"terminal.integrated.shell.linux": "/bin/bash"
	},
	"extensions": [
		"ms-python.python",
		"ms-python.vscode-pylance"
	]
}
```

また、vscodeでPythonの開発するために必要な拡張機能を  
コンテナにインストールするため、`extensions`にPython関連の拡張機能を指定する。

<img width="1178" 
     alt="bss_the15_04" 
     src="https://user-images.githubusercontent.com/38059866/93001290-effd9a00-f568-11ea-863f-4bb5fa11da64.png">

指定する値は下記の赤枠のように、拡張機能名の右に表示されているID。

<img width="590" 
     alt="bss_the15_05" 
     src="https://user-images.githubusercontent.com/38059866/92579446-28cb1400-f2c8-11ea-94f8-ed2170f8196b.png">

### ■ コンテナを開く

再度ウィンドウ左下にある赤枠部分をクリックし、  
「Remote-Containers: Reopen in Container」を選択。

<img width="1136" 
     alt="bss_the15_06" 
     src="https://user-images.githubusercontent.com/38059866/93001965-1ffb6c00-f56e-11ea-947f-14a9b70188a1.png">

無事にコンテナ上のProjectDir「work」を開くことができた。

<img width="1144" 
     alt="bss_the15_07" 
     src="https://user-images.githubusercontent.com/38059866/93002273-d2ccc980-f570-11ea-9b49-5055e7007d71.png">


vscodeの拡張機能を確認すると、コンテナ上には下記二つがインストールされていることがわかる。  
（アイコン右下にリモートだと認識できるマークが付いている）  
インストールされていないようであれば、通常と同様にコンテナに対して  
画面から拡張機能をインストールすることが可能。

<img width="314" 
     alt="bss_the15_08" 
     src="https://user-images.githubusercontent.com/38059866/93002275-d4968d00-f570-11ea-8989-1f20bdf5b71a.png">

### ■ デバッグ用設定ファイルを作成

vscodeのデバッグメニューを選択すると、まだデバッグするための設定ファイルがないため  
下記のような表示になっている。  
※ run.pyを開いた状態でデバッグメニューを選択する必要あり。

まずはlaunch.jsonを作成する。  
今回はFlaskアプリのため「Flask」を選択。

<img width="1107" 
     alt="bss_the15_09" 
     src="https://user-images.githubusercontent.com/38059866/92579453-29fc4100-f2c8-11ea-9a56-33d6fd4a767b.png">

「run.py」を入力。

<img width="1144" 
     alt="bss_the15_10" 
     src="https://user-images.githubusercontent.com/38059866/92579456-2a94d780-f2c8-11ea-84c8-24bf5fb975b3.png">

### ■ デバッグ

ソースコードの任意の場所にブレークポイントをはり  
いざデバッグ実行。

<img width="1144" 
     alt="bss_the15_11" 
     src="https://user-images.githubusercontent.com/38059866/92579457-2a94d780-f2c8-11ea-8a8b-58fcffd82844.png">

無事にデバッグできるようになりました。
