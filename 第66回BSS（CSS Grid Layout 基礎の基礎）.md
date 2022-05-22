# 第66回BSS（CSS Grid Layout 基礎の基礎）

日時　：2021年 3月16日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***

* CSS Gridとは
* p5.jsとは
* サンプル（fackin）
  
***目次***
- [第66回BSS（CSS Grid Layout 基礎の基礎）](#第66回bsscss-grid-layout-基礎の基礎)
  - [環境](#環境)
  - [1. CSS Grid](#1-css-grid)
    - [1.1 概要](#11-概要)
    - [1.2 Flexible Box との違い](#12-flexible-box-との違い)
  - [2. Grid Layout　　の記述](#2-grid-layoutの記述)
    - [2.1 HTML](#21-html)
    - [2.2 CSS(パターンA)](#22-cssパターンa)
    - [2.2.1 コンテナ](#221-コンテナ)
    - [2.2.2 アイテム](#222-アイテム)
    - [2.3 CSS(パターンB)](#23-cssパターンb)
    - [2.3.1 コンテナ](#231-コンテナ)
    - [2.3.2 アイテム](#232-アイテム)
    - [3 ショートハンドで記載](#3-ショートハンドで記載)
    - [3.1 HTML](#31-html)
    - [3.２ CSS](#3２-css)
  - [４. 参考サイト](#４-参考サイト)


## 環境
- macOS Monterey 12.3.1
- Google Chrome 101.0.4951.64（Official Build） （arm64）

## 1. CSS Grid
### 1.1 概要
CSS グリッドレイアウトは、ページを大きな領域に分割することや、 HTML のプリミティブから構成されたコントロールの部品間の、寸法、位置、レイヤーに関する関係を定義することに優れています。(MDN)

### 1.2 Flexible Box との違い

|CSS Grid|CSS Flexible Box|
|:--|:--|
|2次元|1次元|
|![img-grid.PNG](https://qiita-image-store.s3.amazonaws.com/0/87822/d6cf06a2-44a7-5808-1c72-2ce57f699aa5.png)<br>縦横自由に配置|![img-flex.PNG](https://qiita-image-store.s3.amazonaws.com/0/87822/45529723-e3c5-2dcd-3a86-6c63b5853ed7.png)<br>一方向に順番に配置（折り返し）|


## 2. Grid Layout　　の記述
### 2.1 HTML
コンテナの中にアイテムを記載する
```html
<div id="container"> <!-- コンテナ -->
    <div id="itemA">A</div> <!-- アイテム -->
    <div id="itemB">B</div> <!-- アイテム -->
    <div id="itemC">C</div> <!-- アイテム -->
</div>
```

### 2.2 CSS(パターンA)
### 2.2.1 コンテナ
コンテナのCSSにグリッドレイアウトを指定し、行と列のサイズを指定する。  
(`fr`は残りのスペースを埋める)
```css
#container {
    display: grid;
    grid-template-rows: 100px 50px;
    grid-template-columns: 150px 1fr;
}
```
### 2.2.2 アイテム
```css
#itemA {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    background: #f88;
}
：
```

行と列のラインは以下の通り  
![グリッドライン](https://camo.qiitausercontent.com/d52212054e672369dd1713e535aa19183200dd41/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f38373832322f65666635306161612d613363302d623061652d636133352d3131633534643738353237642e706e67)

### 2.3 CSS(パターンB)
### 2.3.1 コンテナ
テンプレートを指定する。
```css
#container {
    display: grid;
    grid-template-rows: 100px 50px;
    grid-template-columns: 150px 1fr;
    grid-template-areas:
        "areaA areaB"
        "areaA areaC";
}
```

### 2.3.2 アイテム
アイテムのCSSにエリアを指定する。
```css
#itemA {
    grid-area: areaA;
    background: #f88;
}
：
```

### 3 ショートハンドで記載
### 3.1 HTML
HTMLは特に変更なし
```html
<div id="container"> <!-- コンテナ -->
    <div id="itemA">A</div> <!-- アイテム -->
    <div id="itemB">B</div> <!-- アイテム -->
    <div id="itemC">C</div> <!-- アイテム -->
    <div id="itemD">D</div> <!-- アイテム -->
    <div id="itemE">E</div> <!-- アイテム -->
    <div id="itemF">F</div> <!-- アイテム -->
</div>
```

### 3.２ CSS
```css
/* コンテナ */
#container {
    display: grid;
    grid-template:
        "areaA areaB areaC" 100px
        "areaD areaE areaF" 100px
        / 200px 200px 200px;
}

#container > div {
    border: 2px solid rgb(233,171,88);
}

/* アイテム */
#itemA {
    grid-area: areaA;
}
：
```

## ４. 参考サイト
- [CSS Grid Layout を極める！（基礎編）](https://qiita.com/kura07/items/e633b35e33e43240d363)
- [CSS Grid Layout を極める！（場面別編）](https://qiita.com/kura07/items/486c19045aab8090d6d9)
- [MDN - CSS グリッドレイアウト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)