# 第42回BSS（AsciiDocでドキュメント作成)

日時　：2021年 4月7日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***
* AsciiDocの基本的な使い方を覚える

***目次***
- [第42回BSS（AsciiDocでドキュメント作成)](#第42回bssasciidocでドキュメント作成)
  - [1.1 AsciiDocとは](#11-asciidocとは)
  - [1.2 MarkDownに対するAsciiDocの優位性](#12-markdownに対するasciidocの優位性)
    - [1.2.1 表現力と可読性](#121-表現力と可読性)
    - [1.2.2 Markdownの欠点](#122-markdownの欠点)
    - [1.2.3 AsciiDocの利点](#123-asciidocの利点)
  - [1.3 AsciiDocの基本的な書き方](#13-asciidocの基本的な書き方)
    - [1.3.1 AsciiDocプラグイン（VSCode用）](#131-asciidocプラグインvscode用)
    - [1.3.2 MarkDown記法とAsciiDoc記法の比較](#132-markdown記法とasciidoc記法の比較)
  - [1.4 GitHub-ActionsでPDFに変換](#14-github-actionsでpdfに変換)
  - [1.5 参考サイト](#15-参考サイト)


## 1.1 AsciiDocとは
AsciiDocは軽量マークアップ言語のひとつである。意味論的にはDocBook XMLと同一であるが、対人可読な文書記述形式であり、文書の（論理）構造を意味付ける規則が平文形式である。ゆえに構文解析器を介することなく、テキストエディタなどを用いてAsciiDocで記述された文書を作成・閲読できる。HTMLを始めPDF、manページ、電子書籍、スライドといった種々の形式にDocBookツールチェーンを介して変換することが可能である。(Wikipedia)


## 1.2 MarkDownに対するAsciiDocの優位性
### 1.2.1 表現力と可読性
技術文書を書く場合HTMLは汎用性が高いが可読性が低い、一方Markdownは可読性が高いがテーブル記法がないなど表現力が乏しい。  
AsciiDocは可読性が高く表現力もある程度高いので、技術文書等を書くには最適である。

- 表現力：HTML > AsciiDoc > Markdown
- 可読性：AsciiDoc ≒ Markdown > HTML

### 1.2.2 Markdownの欠点
- 記法を拡張する方法が言語仕様に定められていないため、方言が乱立している。その結果、互換性のないものとなっている。
- HTMLのタグを使うことで拡張できるが、可読性が低くなる。

### 1.2.3 AsciiDocの利点
- Markdownと同等の可読性で、表現力が高い。
- 記法を拡張する方法が言語仕様に定められている。


## 1.3 AsciiDocの基本的な書き方
### 1.3.1 AsciiDocプラグイン（VSCode用）


![AsciiDoc](https://user-images.githubusercontent.com/19363285/113583003-0afa3d80-9664-11eb-820e-569208dd4578.png)

### 1.3.2 MarkDown記法とAsciiDoc記法の比較
[AsciiDoc vs Markdown 比較チートシート](https://ryuta46.com/344)


## 1.4 GitHub-ActionsでPDFに変換
(Documentsリポジトリ)/.github/workflows/asciidoc.yaml
(Documentsリポジトリ)/.github/workflows/asciidoc.sh

(asciidoctor-actionリポジトリ)/action.yml
(asciidoctor-actionリポジトリ)/Dockerfile
(asciidoctor-actionリポジトリ)/entrypoint.sh

## 1.5 参考サイト
- [AsciiDoc入門](https://qiita.com/xmeta/items/de667a8b8a0f982e123a)
- [AsciiDoc vs Markdown 比較チートシート](https://ryuta46.com/344)

