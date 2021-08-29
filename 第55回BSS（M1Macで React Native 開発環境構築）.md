# 第55回BSS（M1Macで　React Native 開発環境構築）

日時　：2021年 9月1日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***

* M1MacでReact Nativeの開発環境を構築する
* npxコマンドを使っての構築
* Expoを使っての構築
  
***目次***
- [第55回BSS（M1Macで　React Native 開発環境構築）](#第55回bssm1macでreact-native-開発環境構築)
  - [環境](#環境)
  - [1. npxコマンドで環境構築](#1-npxコマンドで環境構築)
    - [1.1 anyenv & nodenv インストール](#11-anyenv--nodenv-インストール)
    - [1.2 anyenv と nodenv 用のプラグイン インストール](#12-anyenv-と-nodenv-用のプラグイン-インストール)
    - [1.3 Node.js インストール](#13-nodejs-インストール)
    - [1.4 Watchman インストール](#14-watchman-インストール)
    - [1.5 Cocoapods インストール](#15-cocoapods-インストール)
    - [1.6 XCode インストール](#16-xcode-インストール)
    - [1.7 JDKインストール](#17-jdkインストール)
    - [1.8 Android Studio インストール](#18-android-studio-インストール)
    - [1.9 Android SDKのインストール](#19-android-sdkのインストール)
    - [1.10 環境変数の設定](#110-環境変数の設定)
    - [1.11 Android エミュレーター（Initial Preview）のインストール](#111-android-エミュレーターinitial-previewのインストール)
    - [1.12 初期プロジェクト作成](#112-初期プロジェクト作成)
    - [1.13 iOSエミュレーターで表示](#113-iosエミュレーターで表示)
    - [1.14  Androidエミュレーターで表示](#114--androidエミュレーターで表示)
  - [2. Expoで環境構築](#2-expoで環境構築)
    - [2.1 Expoインストール](#21-expoインストール)
    - [2.2 初期プロジェクト作成](#22-初期プロジェクト作成)
  - [3. 参考サイト](#3-参考サイト)


## 環境
- macOS Big Sur 11.5.1

  ※ 今回は色々インストールしました。。。


## 1. npxコマンドで環境構築

### 1.1 anyenv & nodenv インストール
```sh
$ brew install anyenv
$ echo 'eval "$(anyenv init -)"' >> ~/.zshrc
$ exec $SHELL -l
$ anyenv install --init
$ anyenv install nodenv
$ exec $SHELL -l
```

### 1.2 anyenv と nodenv 用のプラグイン インストール
``` sh
$ mkdir -p $(anyenv root)/plugins
$ git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update
$ mkdir -p "$(nodenv root)"/plugins
$ git clone https://github.com/nodenv/nodenv-default-packages.git "$(nodenv root)/plugins/nodenv-default-packages"
$ touch $(nodenv root)/default-packages
$ vi $(nodenv root)/default-packages
```
■ default-packages
```
yarn
typescript
ts-node
typesync
```
※ anyenv-update : nodenv を含めた『ほにゃらら env』をまとめてアップデートをしてくれる anyenv プラグイン  
※ nodenv-default-package : npm インストール時にデフォルトでいっしょにインストールしておくパッケージを指定できる nodenv プラグイン

### 1.3 Node.js インストール
```sh
$ nodenv install -l
$ nodenv install 16.5.0
$ nodenv global 16.5.0		# デフォルトのバージョンを指定
```

※ V14.* 以前はM1チップに対応していないとのこと。  
※ “nodenv local <バージョン番号>” で、任意のディレクトリ配下のバージョンを指定できる。(.node-version ファイルが作られる）  
※ “anyenv update” でインストール可能なリストを更新する。（Node を最新版にアップデートする前はこれを実行）


### 1.4 Watchman インストール
```sh
$ brew install watchman
$ watchman version
```

### 1.5 Cocoapods インストール
```sh
$ sudo gem install ffi
$ sudo gem install cocoapods
$ pod —version
```

※ 後からやり直した（意味があったか不明）
```sh
$ sudo gem uninstall ffi cocoapods cocoapods-core cocoapods-deintegrate cocoapods-downloader cocoapods-plugins cocoapods-search cocoapods-trunk cocoapods-try
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 sudo gem install cocoapods
```

### 1.6 XCode インストール
- AppStoreからインストール


### 1.7 JDKインストール
- [第44回BSS（M1MacでJava開発）](https://github.com/bauworks/BSS/blob/master/%E7%AC%AC44%E5%9B%9EBSS%EF%BC%88M1Mac%E3%81%A7Java%E9%96%8B%E7%99%BA%EF%BC%89.md)
参照

```sh
$ java —version
$ javac —version
```

### 1.8 Android Studio インストール
[Android Studioの公式ホームページ](https://developer.android.com/studio?hl=ja)からダウンロード

- 解凍後、表示されたウィンドウのAndroid StudioをApplicationsにドラッグ&ドロップしてインストール
- インストール完了後、Android Studioを起動し、Android Studioの初期設定。
- 今回は設定ファイルがないので「Do not import settings」を選択
- インストールタイプ →「Custom」を選択し、後は基本デフォルト設定
- SDK Components Setupでは以下でインストール。（デフォルトだった）

![SDK Components Setup](https://user-images.githubusercontent.com/19363285/128726891-60d61aad-4de6-4de6-a2f8-c9de320ddd5f.png)


### 1.9 Android SDKのインストール
1. Android Studioのホーム画面右下の「Configure」→「SDK Manager」を開く。
2. [SDK Platforms] タブ  
   「Show Package Details」にチェックを入れ、Android11.0（R）以下に次の項目がチェックされていることを確認。
   - Android SDK Platform 30
   - Google APIs Intel x86 Atom System Image
   - Google APIs Intel x86_64 Atom System Image
3. [SDK Tools]タブ  
   「Show Package Details」にチェックを入れ、次の項目がチェックされていることを確認。
   - Android SDK Build-Tools の 31.0.0（最新）
   - Android SDK Command-line Tools (latest)
4. 「Apply」を選択してSDKをインストール。


### 1.10 環境変数の設定
  React NativeはAndroid Studioの環境変数を利用するので、その設定を行います。  
  $HOME/.zshrcファイルに以下の環境変数を追加。

.zshrc
```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 1.11 Android エミュレーター（Initial Preview）のインストール
M1 Macでは現在(2021/08/15)Android StudioのAndroid Emulatorに対応していないので、Android StudioのEmulatorとは別にGitHubから「Android Emulator」をインストールする。

- [google:android-emulator-m1-preview](https://github.com/google/android-emulator-m1-preview/tags)  
  ※ 最新をダウンロード（2021/08/15 V0.3）

■ インストール手順
1. dmgを開く
2. Android Emulator.app をAppricationsショートカットにドラッグ＆ドロップ
3. 「システム環境設定」で「セキュリティとプライバシー」を開く
4. ダウンロードしたアプリケーションの実行許可で、Android Emulator.app を許可する  
（このまま開くボタンをクリック）


■ ADBのパスを通す  
  Android Emulatorを起動するとワーニングが出るので、ダイアログに従ってADBのパスを通す。
1. 「...」をクリックし、Extended controls画面を開く
2. Settings - Generalタブ - Use detected ADB location でADB(Android Debug Bridge)へのパスを入力  
    例: /Users/bauworks/Library/Android/sdk/platform-tools/adb


### 1.12 初期プロジェクト作成
1. ターミナルを終了させる
2. ターミナル.appを右クリック→情報を見る→「Rosettaを使用して開く」をチェック（※）  
   （後で戻しておきましょう）
3. ターミナルを起動
4. プロジェクトを作る場所へディレクトリを移動し、Sampleプロジェクトを作成

```sh
$ npx react-native init Sample
```

※ 以下を`$HOME/.zshrc`に入れておくとターミナルの設定をいちいち変えなくても`swarch`でアーキテクチャを切替え出来て便利。
```sh
swarch() {
    if  [[ "$(uname -m)" == arm64 ]]; then
        ARCH="x86_64"
    elif [[ "$(uname -m)" == x86_64 ]]; then
        ARCH="arm64e"
    fi
    exec arch -arch $ARCH /bin/zsh
}
uname -m
```


### 1.13 iOSエミュレーターで表示
```sh
$ cd Sample
$ uname -m
x86_64
$ npx react-native run-ios
```
![iPhoneスクリーンショット](https://user-images.githubusercontent.com/19363285/128728391-c75aa5ed-2227-45b4-a350-7c52f4a918ca.png)


### 1.14  Androidエミュレーターで表示
arm64で実行できる。
1. Android Emulatorを起動
2. ADB(Android Debug Bridge)がエミュレーターを認識していることを確認
    ```sh
    $ adb devices
    List of devices attached
    emulator-5554	device
    ```
3.  アンドロイドAPP実行
    ```sh
    $ cd Sample
    $ uname -m
    arm64
    $ npx react-native run-android
    ```
![Androidスクリーンショット](https://user-images.githubusercontent.com/19363285/129483556-bdb61f1f-0ff6-4787-b3d4-e5fa280651e9.png)


## 2. Expoで環境構築
### 2.1 Expoインストール
```sh
$ npm install -g expo-cli
```

### 2.2 初期プロジェクト作成
```sh
$ expo init SampleExpo
### 以下を選択 ###
blank (TypeScript)  same as blank but with TypeScript configuration

$ cd SampleExpo
$ npm start
```

※ Expo Developer Toolsがブラウザ上で立ち上がる。
  ■ Expo Developer Tools
  ![Expo](https://user-images.githubusercontent.com/19363285/128730498-369d715f-cf5f-4d71-a278-fead445da131.png)



1. 左サイドバーの CONNECTION のラジオボタン[Tunnel] を選択
1. 下のQRコードを「EXPO GO」をインストールしたiPhoneのカメラで読み取ってアクセスする。  

  ■ Expo Go
  ![Expo Go](https://user-images.githubusercontent.com/19363285/128731004-905f9c5f-cdef-4de0-9bee-8d44fcf2a9b8.jpeg)

## 3. 参考サイト
- [React Nativeの環境構築の手順【MacOS版/M1対応】](https://tegralsblog.com/react-native-mac-development-environment/)
- [M1 Mac で CocoaPods の pod install しようとすると ffi あたりで落ちて辛い話。](https://blog.dnpp.org/cocoapods_on_m1)
- [Run React Native Android App On Mac M1](https://dev.to/ravics09/run-react-native-android-app-on-mac-m1-2goh)
- [【M1 Mac】Android Emulatorが起動できない時の対処法](https://flutternyumon.com/how-to-setup-android-emulator-for-mac-m1/)
- [m1 macでAndroid Emulatorを起動させる](https://zenn.dev/tatsuhiko/articles/0cf97aa4a238ae)
- [MacにReact Native環境構築（Expo）](https://tanakasanji.site/react-native-expo/)
- [React Native + ExpoでWindowsからHello World](https://www.mitsue.co.jp/knowledge/blog/frontend/202104/12_1712.html)
