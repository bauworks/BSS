# 第31回BSS（Uno Platform環境構築）

日時　：2021年 1月6日(水)  
参加者：古川・有川・森(発表者)

---
## 今回の趣旨
- UnoPlatformの環境構築

## 目次
1. [UnoPlatformとは](#1)
1. [環境](#2)
1. [開発環境を構築](#3)
1. [参考サイト](#4)

## 1. Uno Platformとは <a id="1"></a>

C#でクロスプラットフォーム開発ができる。  
Xamarinがあるじゃん？と思いますが  
下記のデメリットがある。  
・Xamarin.Formsは独自のXAML（WPFやUWPとは書き方がだいぶ異なる）  
・Webアプリは作れない  

それを解決しちゃったのがUnoPlatform。  
下記を作れちゃう。  

- Windows (PC)
- Android
- iOS (iPhone, iPad) ← ビルドするのにMacが必要
- WebAssembly (スマホ、PC、タブレットのブラウザ)

オープンソースプロジェクトでFirstCommitが2018/05。  
またコントリビューターにMicrosoftやXamarinを含む50位上の個人／組織が参加。  
2019/09にUno Platform 2.0がリリース。  
ただし、Windows 10 と Visual Studio 2017（15.5以降）が必要。

## 2. 環境 <a id="2"></a>
- Mac OS
- VMwareでWindows 10 Enterprise（[開発者向け](https://developer.microsoft.com/ja-jp/windows/downloads/virtual-machines/)）  
※ VMwareの環境については[第22回BSS](./第22回BSS（Macでvmware+Windows10の仮想環境を構築）.md)参照  
※ VisualStudio2019, VisualCode, .NET 5.0など開発環境が揃ってる。  
※ 仮想WindowsのRAMはデフォルトで2GBなので8GBぐらいにしておく。  
  それでもAndroidエミュレーターを起動するとかなり時間がかかる。  
  （エミュレーターを起動 → Androidアプリビルド → 実行 で30分弱かかった）
※ Windowsの機能でHyper-Vを有効にしておく。  
※ Mac上のフォルダを仮想環境と共有しておけばソースはMac上で管理できる。  

## 3. 開発環境を構築 <a id="3"></a>

[Uno Platform 入門 2 : 環境構築をしよう！ Uno Platform ハローワールド](https://qiita.com/chomado/items/0dc020f10eb738cad7cd)を実施。

1. Windows 10 で Visual Studio Installer を起動
1. 下記３つにチェックを入れてインストール
    - Universal Windows Platform development
    - Moblie development with .NET
    - ASP.NET and web development

## 4. 参考サイト <a id="4"></a>

- [UWPアプリを書けばiOS／Android／Webでも動く!?～Uno Platform：クロスプラットフォーム開発環境](https://codezine.jp/article/detail/11795)
- [Uno Platform 入門 1 : Uno Platform とは？ ～ C# で iOS, Android, Web, Windows 10 アプリを一気にクロスプラットフォーム開発～](https://qiita.com/chomado/items/9a36d5e1bb41c4f6cef3)
- [Uno Platform 入門 2 : 環境構築をしよう！ Uno Platform ハローワールド](https://qiita.com/chomado/items/0dc020f10eb738cad7cd)