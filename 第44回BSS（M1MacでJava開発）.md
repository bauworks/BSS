# 第44回BSS（M1MacでJava開発)

日時　：2021年 4月28日(水)  
参加者：古川(発表者)・有川

---
***今回の趣旨***
* M1MacでJavaの開発環境を作る

***目次***
- [第44回BSS（M1MacでJava開発)](#第44回bssm1macでjava開発)
  - [1. Java開発環境を作る](#1-java開発環境を作る)
  - [1.1 Homebrew インストール](#11-homebrew-インストール)
  - [1.2 AdaptOpenJDK インストール](#12-adaptopenjdk-インストール)
  - [1.3 Gradle インストール](#13-gradle-インストール)
  - [1.4 VSCodeにエクステンションパックをインストール](#14-vscodeにエクステンションパックをインストール)
- [2. Spring BootでミニマムなWebアプリを作成](#2-spring-bootでミニマムなwebアプリを作成)
  - [2.1 SpringBootプロジェクトを作成する](#21-springbootプロジェクトを作成する)
  - [2.2 ソースコード](#22-ソースコード)
    - [■ index.html](#-indexhtml)
    - [■ spcss.css](#-spcsscss)
    - [■ spjs.js](#-spjsjs)
    - [■ SampleController.java](#-samplecontrollerjava)
  - [2.3 動作確認](#23-動作確認)
  - [3. 参考サイト](#3-参考サイト)


## 1. Java開発環境を作る

## 1.1 Homebrew インストール
Homebrewは、macOS（またはLinux）用のパッケージマネージャーです。

公式HP：[Homebrew 〜The Missing Package Manager for macOS (or Linux)〜](https://brew.sh/)


以下のコマンドでHomebrewをインストールする。
```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

インストールが完了したらHomebrewへのPATHを追加する。
```sh
$ echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

動作確認
```
$ brew --version
```

## 1.2 AdaptOpenJDK インストール
AdoptOpenJDK はコミュニティにより提供される OpenJDK のバイナリです。商用利用でも無償で利用可能です。  
AdoptOpenJDK を提供してくれるコミュニティについては公式サイトで「Java User Group（JUG）のメンバー、Java開発者、Azul、Amazon、GoDaddy、IBM、jClarity（Microsoftが買収）、Microsoft、New Relic、Pivotal、Red Hatなどのベンダーのコミュニティです。」と説明がされています。

以下のコマンドでAdoptOpenJDK(最新)をインストールする。
```sh
$ brew install --cask adoptopenjdk
```

インストール確認
```sh
$ java --version              
openjdk 11.0.11 2021-04-20
OpenJDK Runtime Environment AdoptOpenJDK-11.0.11+9 (build 11.0.11+9)
OpenJDK 64-Bit Server VM AdoptOpenJDK-11.0.11+9 (build 11.0.11+9, mixed mode)
```

Java11バージョンをインストールする。
```sh
$ brew tap AdoptOpenJDK/openjdk   
$ brew install --cask adoptopenjdk11
```

インストールしているJAVAのバーションを調べる
```sh
$ /usr/libexec/java_home -V
Matching Java Virtual Machines (2):
    16.0.1 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 16" /Library/Java/JavaVirtualMachines/adoptopenjdk-16.jdk/Contents/Home
    11.0.11 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 11" /Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/adoptopenjdk-16.jdk/Contents/Home
```

JAVAのバージョンを切り替える
```sh
#Java11の場合
$ export JAVA_HOME=`/usr/libexec/java_home -v 11`
#Java16の場合
$ export JAVA_HOME=`/usr/libexec/java_home -v 16`
```
※ ~/.zshrc に追加しておくとよい。



## 1.3 Gradle インストール
Gradleは、オープンソースのビルドシステムです。
同様のツールにMavenがありますが、Gradleでいこうと思います。

```sh
$ brew install gradle
```

## 1.4 VSCodeにエクステンションパックをインストール

■ Java Extension Pack

![Java Extension Pack](https://user-images.githubusercontent.com/19363285/117533786-a39c2880-b029-11eb-885e-b7141689df95.png)



# 2. Spring BootでミニマムなWebアプリを作成

## 2.1 SpringBootプロジェクトを作成する

VSCodeでコマンドパレットを開く(Cmd + Shift + P)

```
Java: Craete Java Project...
  ↓
Select the project type
  Spring Boot
  ↓
Select project type.
  Gradle Project
  ↓
Specify Spring Boot version
  2.4.5
  ↓
Specify project language.
  Java
  ↓
Input Group Id for your project.
  jp.bauworks
  ↓
Input Artifact Id for your project.
  demo7
  ↓
Specify packaging type
  War
  ↓
Specify Java version.
  11
  ↓
Search for dependencies.
  Spring Web
  Spring Boot DevTools
  Thymeleaf
```

## 2.2 ソースコード
### ■ index.html
demo7/src/main/resources/templates/index.html
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="/css/spcss.css">
<script type="text/javascript" src="/js/spjs.js"></script>
<title>
    Spring Boot Sample
</title>
</head>
<body>
    <p class="title">Hello Spring Boot!</p>
    <form method="post" action="/result">
        <input name="inputStr" type="text">
        <button type="submit">送信</button>
    </form>
    <h3 th:text="${tag}"></h3>
    <p th:text="${resultStr}"></p>

</body>
</html>
```

### ■ spcss.css
demo7/src/main/resources/static/css/spcss.css
```css
@charset "UTF-8";
.title {
    font-size: 20px;
    color: #83d94f;
}
```

### ■ spjs.js
demo7/src/main/resources/static/js/spjs.js
```js
console.log("読み込めました");
```

### ■ SampleController.java
demo7/src/main/java/jp/bauworks/demo7/controller/SampleController.java
```java
package jp.bauworks.demo7.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/")
public class SampleController {

    @RequestMapping("/result")
    public String page(String inputStr, Model model) {      
        model.addAttribute("tag", "次の文字列が入力されました。");
        model.addAttribute("resultStr", inputStr);
        return "index";
    }

}
```

## 2.3 動作確認
VSCodeでターミナルを開いて
```sh
$ gradlew bootRun
```
http://localhost:8080/ にアクセスして動作確認する。
![demo7](https://user-images.githubusercontent.com/19363285/117535008-c8df6580-b02e-11eb-84f8-8943e818cfa8.png)



## 3. 参考サイト
- [【MacBook】M1対応したHomebrewをインストールしてみた](https://www.teamxeppet.com/macbook-m1-homebrew-install/)
- [AdoptOpenJDKのダウンロード及びインストール](https://www.javadrive.jp/start/install/index6.html)
- [多分わかりやすいGradle入門](https://tech-lab.sios.jp/archives/9500)
- [【入門】Spring Bootとは～実践まで](https://tech-blog.rakus.co.jp/entry/20201110/java)