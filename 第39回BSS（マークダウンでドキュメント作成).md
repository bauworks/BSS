<link href="Additional/39/md-style.css" rel="stylesheet"></link>

# 第39回BSS（マークダウンでドキュメント作成)

日時　：2021年 3月10日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***
* マークダウンを効率的に編集するためのプラグインと使い方
* マークダウンで図を書く（mermaid.js）

<br>

***目次***
  - [VSコードで効率よくマークダウン編集](#vsコードで効率よくマークダウン編集)
    - [スタイルシートを読み込む (VSプレビュー)](#スタイルシートを読み込む-vsプレビュー)
    - [Markdown All in One (VSプラグイン)](#markdown-all-in-one-vsプラグイン)
      - [よく使いそうなショートカットキー一覧](#よく使いそうなショートカットキー一覧)
      - [画像貼り付けの例](#画像貼り付けの例)
      - [目次を生成する](#目次を生成する)
      - [mdファイルを開いたときに自動でサイドバーにプレビューを表示する](#mdファイルを開いたときに自動でサイドバーにプレビューを表示する)
    - [Excel to Markdown table (VSプラグイン)](#excel-to-markdown-table-vsプラグイン)
    - [Markdown Preview Mermaid Support（VSプラグイン）](#markdown-preview-mermaid-supportvsプラグイン)
    - [Markdown Preview Enhanced（VSプラグイン）](#markdown-preview-enhancedvsプラグイン)
    - [参考サイト](#参考サイト)
  - [テキストベースでフローチャートやシーケンス図を書く（mermaid.js）](#テキストベースでフローチャートやシーケンス図を書くmermaidjs)
    - [書き方](#書き方)
      - [マークダウン](#マークダウン)
      - [HTML](#html)
    - [フローチャートの例](#フローチャートの例)
      - [グラフの方向](#グラフの方向)
      - [ノード形状](#ノード形状)
      - [リンク](#リンク)
      - [グルーピング](#グルーピング)
      - [装飾](#装飾)
    - [シーケンス図の例](#シーケンス図の例)
      - [簡単な例](#簡単な例)
      - [線の書き方（実線、点線、矢印、X矢印）](#線の書き方実線点線矢印x矢印)
      - [ライフライン](#ライフライン)
      - [ライフライン（簡単Ver）](#ライフライン簡単ver)
      - [メモ](#メモ)
      - [複合フラグメント](#複合フラグメント)
    - [ガントチャートの例](#ガントチャートの例)
      - [簡単な例](#簡単な例-1)
      - [休日、祝日を考慮](#休日祝日を考慮)
    - [参考サイト](#参考サイト-1)
<br>

---
## VSコードで効率よくマークダウン編集

### スタイルシートを読み込む (VSプレビュー)

やっぱ見た目は大事デス。  
ただし、この後に出てくる「Markdown Preview Enhanced」のプレビューでは有効にならない。

**使い方**  
1. CSSファイルを作成（例: md-style0.css）
2. 本文の上の方に以下を埋め込む
```html
<link href="md-style.css" rel="stylesheet"></link>
```
<br>

---
### Markdown All in One (VSプラグイン)

![Markdown All in One](https://user-images.githubusercontent.com/19363285/110234260-c4ce9300-7f6c-11eb-9a05-043f76522906.png)

#### よく使いそうなショートカットキー一覧
| キー                 | 結果             |
|----------------------|----------------|
| Command + b             | 太字             |
| Command + i             | 斜体             |
| Ctrl + shift + ]     | ヘッディングレベル上げ    |
| ctrl + shift + [     | ヘッディングレベル下げ    |
| 範囲選択 + Command + V  | リンクの設定         |
| Alt + C              | チェックボックスの有効/無効 |

<br>

#### 画像貼り付けの例
1. 画像ファイルへのリンクをクリップボードにコピー
2. ALT属性の文字列を入力（例: "BAUWORKSのアイコン"）
3. ALT属性を範囲選択して [Ctrl] + [V] ⇒ リンク表示される
4. リンク文字列の"[xxxx]"の前に "!" を入力 ⇒ リンク表示が画像ファイルに変わる


   実行例：  
   ![BAUWORKSのアイコン](https://avatars.githubusercontent.com/u/19363285?s=460&u=09e2feafdff831b8e54a253698391876870fbc06&v=4)
<br>

#### 目次を生成する
**使い方**  
コマンドパレット： Ctrl + Shift + "P"
~~~
 Markdown All in One: Create Table of Contents 
~~~
<br>

#### mdファイルを開いたときに自動でサイドバーにプレビューを表示する

**使い方**  
設定： Command + ","
~~~
 Markdown > Extension > Preview: Auto Show Preview To Side  
 - [x] 自動でプレビューを横に表示する
~~~
<br>

---
### Excel to Markdown table (VSプラグイン)
![Excel to Markdown table](https://user-images.githubusercontent.com/19363285/110235456-60fb9880-7f73-11eb-86de-c0efcb73974a.png)

Excelでコピーした範囲をマークダウン形式で貼り付けることができる。  
Windowsでは便利。Macではあまり使わないかも。


**使い方**  
 Excelで作成したテーブルをコピーして `Shift + Alt + V` で貼り付け。


貼り付けた例：
| No | SVN Rev | Z-SYS Ver | 説明                       |
|----|---------|-----------|--------------------------|
| 1  | r2282   | V3.3.0    | 本番機取得ソースコード       |
| 2  | r2287   | V3.3.1    | 今回改定前のソースコード |
| 3  | r2461   | V4.0.0    | 今回改定を実施したソースコード（3/3時点）   |

<br>

---
### Markdown Preview Mermaid Support（VSプラグイン）
![Markdown Preview Mermaid Support](https://user-images.githubusercontent.com/19363285/110238797-f81e1b80-7f86-11eb-9b42-e60f13e14dd4.png)

プレビューでmermaid.jsで書いた図を解釈してくれる。  
<br>

---
### Markdown Preview Enhanced（VSプラグイン）

![Markdown Preview Enhanced](https://user-images.githubusercontent.com/19363285/110235351-edf22200-7f72-11eb-86c7-d14ddf8e98ce.png)

機能強化されたプレビューが追加される。  
もちろんmermaid.jsで書いた図も解釈してくれる。  
`Markdown Preview Mermaid Support` はデフォルトで搭載されているプレビューのサポート機能なので、mermaid.jsで書かれた図の描画だけが目的なら、このプラグインは使わなくていいかも。
<br>

### 参考サイト
* [Markdownでスタイルシート](https://qiita.com/skkzsh/items/99e30bbbfe69f379b583)  

<br>
<br>

---
## テキストベースでフローチャートやシーケンス図を書く（mermaid.js）

### 書き方
#### マークダウン
   コードスタイル（mermaid）で記述

```
\```mermaid
graph LR
A-->B
\```
```
※ エスケープ記号`\`は不要

以下のように表示される。
```mermaid
graph LR
A-->B
```
<br>

#### HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
</head>
<body>
  <div class="mermaid">
    graph LR
    A-->B
  </div>
  <script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>
  <script>mermaid.initialize({startOnLoad:true});</script>
</body>
</html>
```
<br>

---
### フローチャートの例

#### グラフの方向

LR：レフトからライト
```mermaid
graph LR
    ID1[ノード1] -- リンク --> ID2((ノード2))
    ID3 --> ID2
```

TB：トップからボトム
```mermaid
graph TB
    ID1[ノード1] -- リンク --> ID2((ノード2))
    ID3 --> ID2

```
<br>

#### ノード形状
```mermaid
graph TB
    id1[四角]
    id2((丸))
    id3(角丸四角)
    id4{ひし形}
    id5>リボン]
```

```mermaid
    graph TB
    id11((丸はラベルが長いとノードがすごく大きくなって見づらい))
    id12((適当に改行を<br/>入れた方が<br/>見やすいと<br/>思います))
```
<br>

#### リンク
```mermaid
graph LR
    A-- テキスト -->B
    A--> |テキスト| B

    C-- 実線 ---D
    C---|実線| D
    C-- 実線矢印 -->D
    C-->|実線矢印|D
    
    E-. 点線 .-F
    E-.-|点線|F
    E-. 点線矢印 .->F
    E-.->|点線矢印|F

    G== 太線 ===H
    G===|太線|H
    G== 太線矢印 ==>H
    G==>|太線矢印|H
```
<br>

#### グルーピング
```mermaid
graph TB
    subgraph s1
        s1a --> s1b
    end
    subgraph s2
        s2a --> s2b
        s2a --> s1b
    end
```


ノードは最初にIDの記載が現れた subgraph 内に配置されるので左記にグルーピングしてからリンク定義するとよい。
```mermaid
graph LR
    subgraph s1
        s1a --> s2a
    end
    subgraph s2
        s2a[s2内にあってほしいノード]
    end

    subgraph s3
        s3a
    end

    subgraph s4
        s4a[s4内にあってほしいノード]
    end
    s3a --> s4a
```
<br>


#### 装飾
* ノードの装飾：`style`
* リンクの装飾：`linkStyle`
  linkStyle 通し番号 のように、0始まりでリンクの通し番号を指定する。
  対象のリンクより先に linkStyle を書くと正しく出力されない。
  通し番号は0始まり

```mermaid
graph LR
    customnode --> normal
    style customnode fill:#f00,stroke:#fff,stroke-width:5px,stroke-dasharray:3

    customlink --> normal
    normalA --> normalB

    linkStyle 1 stroke:#ff3,stroke-width:4px,stroke-dasharray: 1
```
<br>

* クラス定義による装飾
```mermaid
graph TB
    custom1 --> normal
    custom2 --> normal
    classDef classA fill:#f00,stroke:#fff,stroke-width:5px;
    class custom1,custom2 classA;
```

<br>

---
### シーケンス図の例
#### 簡単な例
```mermaid
sequenceDiagram
participant A as Alice
participant J as John
    A ->>  J : Hello John, how are you?
    J -->> A : Great!
```
<br>

#### 線の書き方（実線、点線、矢印、X矢印）
```mermaid
sequenceDiagram
    A->B:AとBを実線
    A-->B:AとBを点線 
    A->>B:AからBへ実線矢印
    B-->>A:BからAへ点線矢印
    A -x B:AからBへ×付きの実線矢印
    B --x A:BからAへ×付きの点線矢印
    B->>B:ループ
```
<br>

#### ライフライン
```mermaid
sequenceDiagram
    A->>B:how are you?
    activate B
    B-->>A:Great!
    deactivate B 
```
<br>

#### ライフライン（簡単Ver）
```mermaid
sequenceDiagram
    Alice ->>  +John : Hello John, how are you?
    Alice ->>  +John : John, can you hear me?
    John  -->> -Alice: Hi Alice, I can hear you!
    John  -->> -Alice: I feel great!
```
<br>

#### メモ

Note [Position] [Actor]
+ [Position] : `right of`, `left of`, `over`
+ [Actor]    : 誰につけるか？（overの場合は複数）

```mermaid
sequenceDiagram
    Alice ->>   +John: Hello John, how are you?
    Alice ->>   +Michael: Hello Michael, how are you?
    Note right of John:he is so busy...
    Alice ->>   +John: John, can you hear me?
    John  -->>  -Alice: Hi Alice, I can hear you!
    John  -->>  -Alice: I feel great!
    Note over John,Alice: Nice Communication!
    Michael -->> -Alice: I have a cold...
    Note right of Michael: Sorry
```

#### 複合フラグメント


* loop
```mermaid
sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
        John-->Alice: Great!
    end
```
<br><br>

* alt, opt, par
```mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end

    opt notice
        par thanks
            Alice -->> Bob : Thank you.
            Alice -->> John : Thank you.
        end
    end
```

<br>

---
### ガントチャートの例
#### 簡単な例
```mermaid
gantt
    title work
    dateFormat YYYY-MM-DD
    axisFormat  %m/%d

    section work_A
    準備    :a1 ,2019-12-12 ,1d
    作業    :a2 ,after a1 ,3d
    リリース :a3 ,after a2 ,2d

    section work_B
    準備    :b1 ,after a2 ,3d
    作業_1  :b2 ,after b1 ,4d
    作業_2  :b3 ,after b1 ,3d
    リリース :b4 ,after b2 ,1d

    section work_C
    準備    :c1 ,after b4 ,1d
    作業    :c2 ,after c1 ,2d
    レビュー :c3 ,after c2 ,1d
    リリース :c4 ,after c3 ,1d
```

<br>

#### 休日、祝日を考慮

`excludes` に週末なら `weekends` 、祝日は日付を直接指定する。  


```mermaid
gantt
    title dev schedule(休日祝日考慮)
    dateFormat YYYY-MM-DD
    axisFormat  %m/%d
    excludes weekends 2020-04-29  2020-05-02 2020-05-03 2020-05-04 2020-05-05 2020-05-06 2020-07-23 2020-07-24 2020-08-10 2020-09-21 2020-09-22 2020-11-03 2020-11-23

    section HTML
        設計&開発ドキュメント作成: design_and_doc, 2020-04-13, 3d

    section Migration
        設計: desgin_migration, after design_and_doc, 2d
        実装: imple_migration, after imple_api, 5d

    section REST API
        設計: design_api, after desgin_migration, 5d
        実装: imple_api, after design_api, 5d
        テスト: test_api, after imple_api, 5d

    section Android
        実装: imple_android, after test_api, 2w

    section iOS
        実装: imple_ios, after imple_android, 2w
```
<br>

---
### 参考サイト
* [mermaid.jsのフローチャートの書き方](https://ryuta46.com/516)  
* [VScodeでmermaidを使ったmarkdown資料作りメモ](https://qiita.com/ZOOSHIMA/items/693ee8fd93146dd69b0e)  
* [Mermaid.js コードでガントチャートを書く 簡易編](https://qiita.com/miriwo/items/7df0024d4098302e5721)  
* [mermaidのガントチャートで休日と祝日を考慮して表示する方法](https://qwx.jp/mermaid-ganttchart-excludes-weekends-and-holiday/)  

