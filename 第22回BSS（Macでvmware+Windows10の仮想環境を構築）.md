# 第22回BSS（MacでVMware+Windows10の仮想環境を構築）

日時　：2020年 10月28日(水)  
参加者：古川・有川・森(発表者)

---
## 今回の趣旨
- MacにVMwareを導入
- VMwareでWinsows 10 Enterprise(開発者向け) を動かす

## 目次
1. [VMwareをInstall](#1)
1. [Win10開発環境の仮想マシンをVMwareにインストール](#2)

## 1. VMwareをInstall <a id="1"></a>

1. [myvmware](https://my.vmware.com/)にてアカウントを作成
2. ログインした状態で言語設定をEnglishにし、[Personal Use License](https://my.vmware.com/group/vmware/evalcenter?p=fusion-player-personal)ページへ

<img width="736" 
     alt="bss_the22_01" 
     src="https://user-images.githubusercontent.com/38059866/103462762-e17efc80-4d6a-11eb-9592-bae02d6cfff1.png">

3. registerをクリック
4. 必須項目を追記してsign upをクリック
5. ライセンスキーが取得できたのでコピー
6. すぐ下のDownload PackagesでManually Downloadをクリック
7. ダウンロードしたdmgファイルをダブルクリック
8. 下記をダブルクリックしインストール開始

<img width="578" 
     alt="bss_the22_02" 
     src="https://user-images.githubusercontent.com/38059866/103462764-e348c000-4d6a-11eb-8301-4e3a7454cfb8.png">


9. ライセンスキーを入力

<img width="798" 
     alt="bss_the22_03" 
     src="https://user-images.githubusercontent.com/38059866/103462765-e3e15680-4d6a-11eb-954d-9e7c22dd3fce.png">

<img width="798" 
     alt="bss_the22_04" 
     src="https://user-images.githubusercontent.com/38059866/103462766-e479ed00-4d6a-11eb-871c-6d757e0c8513.png">

10. 「アクセシビリティにアクセスできません」と出たら  

<img width="534" 
     alt="bss_the22_05" 
     src="https://user-images.githubusercontent.com/38059866/103462767-e5128380-4d6a-11eb-991f-4c28e742c87c.png">

システム環境設定 -> セキュリティとプライバシー -> 一般を開き  
左下のカギマークをクリックしてVMwareを許可

<img width="780" 
     alt="bss_the22_06" 
     src="https://user-images.githubusercontent.com/38059866/103462769-e5128380-4d6a-11eb-9840-aeed7a82d9fe.png">


プライバシータブ -> アクセシビリティより「VMware Fusion.app」のチェックON



## 2. Win10開発環境の仮想マシンをVMwareにインストール <a id="2"></a>

### ■ download

1. [ダウンロードサイト](https://developer.microsoft.com/ja-jp/windows/downloads/virtual-machines/)へGo
1. VMwareをクリック
1. ダウンロードしたzipを任意の場所に解凍

※ 2020/10/19時点でのバージョン：Windows 10 バージョン 2004 (10.0.19041.0) [有効期限:2020/12/13]

### ■ 仮想マシンを作成

1. 仮想マシン作成画面で「既存の仮想マシンをインポート」を選択して「続ける」をクリック

<img width="752" 
     alt="bss_the22_08" 
     src="https://user-images.githubusercontent.com/38059866/103462771-e643b080-4d6a-11eb-8618-ce8a5c1ebaa6.png">

または仮想マシンのライブラリ画面から「インポート」を選択

<img width="382" 
     alt="bss_the22_10" 
     src="https://user-images.githubusercontent.com/38059866/103462773-e643b080-4d6a-11eb-9c3b-3036e750552c.png">

2. 「xxxx.ovf」ファイルを選択

<img width="418" 
     alt="bss_the22_09" 
     src="https://user-images.githubusercontent.com/38059866/103462772-e643b080-4d6a-11eb-8b47-9f27230bbed3.png">

あとは待つだけ。

<img width="752" 
     alt="bss_the22_11" 
     src="https://user-images.githubusercontent.com/38059866/103462774-e6dc4700-4d6a-11eb-9343-54f653c4d5fa.png">

Dockerを入れてみた。

<img width="1458" 
     alt="bss_the22_12" 
     src="https://user-images.githubusercontent.com/38059866/103553842-5e3be300-4ef1-11eb-8b65-60b15ba98b4e.png">

デフォルトでは
- RAM : 2GB
- 仮想的な？Windows上のストレージ容量 : 128GB  
　※Macの物理容量としては50数GBを使ってるかな？  
　（細かくまでは見てません）