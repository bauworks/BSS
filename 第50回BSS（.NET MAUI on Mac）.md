# 第50回BSS（.NET MAUI on Mac）

日時　：2021年 6月23日(水)  
参加者：古川・有川・森(発表者)

---
## 今回の趣旨
- .NET MAUI に触れてみる

## 目次
1. [.NET MAUIとは](#1)
1. [開発環境](#2)
1. [とりあえずMac用アプリのプロジェクトを作ってみる](#3)
1. [参考サイト](#4)

## 1. .NET MAUIとは <a id="1"></a>

マルチプラットフォーム開発用のUIフレームワーク。
.NET Multi-platform App UIの略。

## 2. 開発環境 <a id="1"></a>

### .NET MAUI Check Tool インストール

ツールをインストールしてチェックするのみ。
```
$ dotnet tool install -g redth.net.maui.check
```
### maui-check

```
$ maui-check
```

<img width="822" alt="bss-50-01" src="https://user-images.githubusercontent.com/38059866/122938166-7fb05e80-d3ad-11eb-85f0-8407e944e99c.png">

### XCodeで失敗！？

XCode 12.4でIssuesに上がってたので試してみた。
ちなみに2021/06/22時点でのXCodeは12.5。

[Redth/dotnet-maui-check/issues](https://github.com/Redth/dotnet-maui-check/issues/21)

```
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

が、ダメだった。。。

## 3. とりあえずMac用アプリのプロジェクトを作ってみる <a id="1"></a>

### Create
```
$ dotnet new macos -o MauiMacSample
```

### Build
```
$ dotnet build -r osx-x64 -p:PublishTrimmed=false
```

### Run
```
$ dotnet run -r osx-x64
```

コントロールなど配置はしてないがとりあえずウィンドウは表示されたので動いた。

<img width="592" alt="bss-50-02" src="https://user-images.githubusercontent.com/38059866/122958152-92329400-d3bd-11eb-91c6-c78907d8f9da.png">

## 4. 参考サイト <a id="1"></a>

- [dotnet/maui-samples](https://github.com/dotnet/maui-samples)
- [dotnet/maui](https://github.com/dotnet/maui/wiki/Getting-Started)