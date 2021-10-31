# 第58回BSS（SeleniumとPython環境構築）

日時　：2021年 10月27日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***

* M1MacにPython環境（anyenv+pyenv）を構築する
* DockerコンテナでSeleniumを実行する
  
***目次***
- [第58回BSS（SeleniumとPython環境構築）](#第58回bssseleniumとpython環境構築)
  - [環境](#環境)
  - [1. Python環境構築](#1-python環境構築)
    - [1.1 pyenv インストール](#11-pyenv-インストール)
    - [1.2 Python（最新版）をインストールし、利用可能にする](#12-python最新版をインストールし利用可能にする)
  - [2. Seleniumでブラウザを操作](#2-seleniumでブラウザを操作)
    - [2.1 Seleniumとは](#21-seleniumとは)
    - [2.2 Seleniumのインストール](#22-seleniumのインストール)
    - [2.3 Seleniumでブラウザ（Chrome）の操作](#23-seleniumでブラウザchromeの操作)
    - [2.3.1 Seleniumを動作させるDockerコンテナ起動](#231-seleniumを動作させるdockerコンテナ起動)
    - [2.3.2 VNCでDockerコンテナに接続](#232-vncでdockerコンテナに接続)
    - [2.3.3 Chromeを操作するスクリプト](#233-chromeを操作するスクリプト)
    - [2.3.4 Selenium実行](#234-selenium実行)
  - [参考サイト](#参考サイト)


## 環境
- macOS Big Sur 11.6
- anyenv 1.1.4 （55th BSSでインストール済み）
- Docker 20.10.8


## 1. Python環境構築

もともと入っているPythonはバージョンが2.7.xなので、3.x.xをインストールする。
pyenvを使って任意のバージョンを切り替えれるようにする。

### 1.1 pyenv インストール

anyenvはインストールされているものとする。
（￥インストール手順は55thBSSを参照）

どんな *env が扱えるのかを確認。
```sh
$ anyenv install -l
  Renv
  crenv
  denv
  erlenv
  exenv
  goenv
  hsenv
  jenv
  jlenv
  luaenv
  nodenv
  phpenv
  plenv
  pyenv
  rbenv
  sbtenv
  scalaenv
  swiftenv
  tfenv
```
※ pyenvがあることを確認

pyenvのインストール
```sh
$ anyenv install pyenv
	:
	:
Install pyenv succeeded!
Please reload your profile (exec $SHELL -l) or open a new session.
```

シェルを読み込み直す
```sh
$ exec $SHELL -l
```

バージョン確認
```sh
$ pyenv -v
```

### 1.2 Python（最新版）をインストールし、利用可能にする

インストール可能なpythonを列挙してみる。
```sh
$ pyenv install -l
  :
  :
  3.9.7
  3.10.0
  3.10-dev
  3.11.0a1
  3.11-dev
  :
```

実行時は 3.10.0 が安定版の最新だったので、3.10.0 をインストールする。
```sh
$ pyenv install 3.10.0
```

バージョン確認
```sh
$ python --version
Python 2.7.16
```
※ まだデフォルトのまま


グローバルバージョンを3.10.0にする
```sh
$ pyenv global 3.10.0
$ exec $SHELL -l
$ python --version
Python 3.10.0
```

pythonのインストールされている場所を確認
```sh
$ which python
/Users/bauworks/.anyenv/envs/pyenv/shims/python
```


## 2. Seleniumでブラウザを操作

### 2.1 Seleniumとは
```
Selenium は、 Webアプリケーションをテストするためのポータブルフレームワークである。 Selenium は、テストスクリプト言語(Selenium IDE)を学ぶ必要なしに、機能テストを作成するための再生ツールを提供する。また、C＃、Groovy、Java、Perl、PHP、Python、Ruby、Scala 等の一般的なプログラミング言語でテストを作成するためのテストドメイン固有言語(Selenese)も提供する。その後、テストはほとんどの最新のWebブラウザに対して実行できる。Selenium は、Windows、Linux、およびmacOSで動作する。これは、Apache License 2.0 の下でリリースされたオープンソースソフトウェアである。(Wikipedia)
```


### 2.2 Seleniumのインストール
pipでインストールする。

```sh
$ pip install selenium
```

### 2.3 Seleniumでブラウザ（Chrome）の操作
### 2.3.1 Seleniumを動作させるDockerコンテナ起動
```sh
$ docker run --rm -it -p 4444:4444 -p 15900:5900 -p 7900:7900 --shm-size 3g seleniarm/standalone-chromium:4.0.0-beta-1-20210215
```
※ Arm対応版が公式では用意されていなかった。

### 2.3.2 VNCでDockerコンテナに接続
Finderで「移動」ー「サーバーへ接続」
![vnclocalhost15900](https://user-images.githubusercontent.com/19363285/139583709-7e8f9a97-1955-4dc4-b7ee-6babcdd83000.png)

※ パスワード：secret


### 2.3.3 Chromeを操作するスクリプト

selenium_yahoo.py
```py
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# x. Chrome の起動オプションを設定する
options = webdriver.ChromeOptions()
#options.add_argument('--headless')

# x. ブラウザの新規ウィンドウを開く
print('connectiong to remote browser...')
driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    desired_capabilities=options.to_capabilities(),
    options=options,
)
driver.implicitly_wait(10)

# 1. Yahoo!JAPAN のTOPページにアクセスする
driver.get('https://www.yahoo.co.jp')
print('1. current_url : ' + driver.current_url)

# 2. 「ニュース」に表示されている記事の上から３番目のページに移動する
driver.find_element(By.XPATH, '//*[@id="tabpanelTopics1"]/div/div[1]/ul/li[3]/article/a/div/div/h1/span').click()

# 3. 移動した記事の右に表示されているトピックスの２番目のエレメントを取得
article_links = driver.find_elements(By.XPATH, '//*[@id="yjnFixableArea"]/div/section[1]/ul/li[2]/a')

# 3.1. 取得したエレメントのテキストを表示 
next_title = article_links[0].text
print(next_title)

# 3.2. 取得したエレメントのリンクを表示
next_link = article_links[0].get_attribute('href')
print(next_link)

# 3.3. 取得したエレメントのリンクにアクセス
driver.get(next_link)

# x. 10秒経ったらブラウザを終了する
time.sleep(10)
driver.quit()
```

### 2.3.4 Selenium実行
```sh
$ python selenium_yahoo.py
```
![selenium](https://user-images.githubusercontent.com/19363285/139584548-c13569b1-3858-4949-adc3-11539c3fa6b4.png)

## 参考サイト
- [M1 Macではselenium/standalone-chromeのdocker imageが使えない](https://qiita.com/takugenn/items/10bc77f0e88167482366)
- [10分で理解する Selenium](https://qiita.com/Chanmoro/items/9a3c86bb465c1cce738a)

