# 第14回BSS（Vue.jsを触ってみる）

日時　：2020年9月2日(水)  
参加者：有川(発表者) ・古川(Extra)・森  

---
## 今回の趣旨
- 第11回BSSでReactで作ったサンプル(todoアプリ)をVue.jsを使って作ってみる。

## 目次
0. [Vue.jsとは](#0Vuejsとは)  
1. [HTML作成](#1HTML作成)  
2. [スクリプト作成](#2スクリプト作成)  
3. [完成](#3完成)
4. [Extra](#4Extra)
    * [Ex1.ミニマムにReact](#Ex1.ミニマムにReact)
    * [Ex2.ミニマムにTypeScript](#Ex2.ミニマムにTypeScript)

---
## 0.Vue.jsとは
>このプロジェクトは、Web UI開発（コンポーネント、宣言的UI、ホットリロード、タイムトラベルデバッグなど）において、アイデアをより実現させることに焦点を当てている。独断的ではなく開発者がピックアップしやすい。
部分的に採用可能なアーキテクチャ（プログレッシブフレームワーク）を採用している。 コアライブラリは、宣言的なレンダリングとコンポーネントの構成に焦点を合わせ、既存のページに埋め込むことができる。 ルーティング、状態管理、ビルドツールなどの複雑なアプリケーションに必要な高度な機能は、正式に維持されているサポートライブラリとパッケージを介して提供される。(Wikipedia)
https://ja.wikipedia.org/wiki/Vue.js

## 1.HTML作成

↓のHTMLを作成。
```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <p>Vue</p>
        <div id="todolist">
            <input placeholder="edit me">
            <button>add todo</button>
            <ul>
            </ul>
        </div>
    </body>
</html>
```

↓のようにスクリプトタグでVue.jsを読み込む。
```html
 <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

## 2.スクリプト作成

### i) Vue.jsで状態管理を行う部分に組み込むスクリプトを作成

1.で作成したHTMLのid=”todolist"のdivタグが今回todo追加で状態が変化していく箇所となる。  
1.で作成したHTMLにスクリプトタグを作成し、タグ内に↓のスクリプトを書く。
~~~javascript
<script>
    new Vue({
        el:"#todolist",        // 適用する要素のIDを指定
        data: {                // 変数定義
            todoitem:"",
            items: []
        },
        methods: {
            // メソッド定義(add Todo ボタンが押下された際に動く)
            addTodo: function() {
                this.items.push({message:this.todoitem})
            }
        }
    })
</script>
~~~

### ii) HTML要素にメソッド呼び出し部分を組み込む
```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <p>Vue</p>
        <div id="todolist">
            <input  v-model="todoitem" placeholder="edit me">
            <button v-on:click="addTodo">add todo</button>
            <ul>
                <li v-for="item in items" :key="item.message">
                  {{ item.message }}
                </li>
            </ul>
        </div>
    </body>
    <script>
        new Vue({
            el:"#todolist",        // 適用する要素のIDを指定
            data: {                // 変数定義
                todoitem:"",
                items: []
            },
            methods: {
                // メソッド定義(add Todo ボタンが押下された際に動く)
                addTodo: function() {
                    this.items.push({message:this.todoitem})
                }
            }
        })
    </script>
</html>
```

## 3.完成
こんな感じのができました。
![vuejsdemo](https://user-images.githubusercontent.com/66286964/92468906-e1348180-f20e-11ea-8e05-84b40a8d1b1b.gif)

---

## 4.Extra
ReactとTypeScriptのそれぞれをミニマムに動かしてみました。

### Ex1.ミニマムにReact
React本体を読み込んで `ReactDom.render()`するだけ。
#### helo.html
```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>React Test</title>
    </head>
    <body>
        block1:
        <div id="block1"></div>
        <hr>
        block2:
        <div id="block2"></div>
    </body>
</html>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.10.3/babel.min.js"></script>
<script type="text/babel">
    ReactDOM.render(
        <h1>Hello world!</h1>,
        document.getElementById('block2')
    );
</script>
```

![react_helloworld](https://user-images.githubusercontent.com/19363285/93863153-215f2e00-fcfe-11ea-9b3e-5dc91f4bea4f.png)

※ レンダー先を `document.getElementById('block1')` とすると水平線の上（block1側）に「Hello world!」が表示されます。

---
### Ex2.ミニマムにTypeScript
次のサイトを参考にさせていただきました。  
* [TypeScript入門 - とほほのWWW入門](http://www.tohoho-web.com/ex/typescript.html)

まずはNode.js環境を作るところから。（Dockerは入っているものとします）
#### docker-compose.yaml
```yaml
version: "3.8"
services:
  tohoho:
    image: node:12.18.3-alpine3.12
    container_name: tohoho
    volumes:
      - ./tohoho:/tohoho
    working_dir: /tohoho
    tty: true
    ports:
      - 3100:3100

```

#### コンテナを立ち上げて中に入ります。
```
$ docker-compose up -d
（初回はコンソールに返ってこないので<Ctrl-C>で終了）
$ docker-compose up -d
$ docker-compose exec tohoho sh
```

#### npm 初期化
質問はすべてデフォルト値（Enterキーを押すだけ）でOK
```
/tohoho # npm init
 :
package name: (tohoho) 
version: (1.0.0) 
license: (MIT) 
 :
Is this OK? (yes) 
```


#### TypeScriptをインストール
```
/tohoho # npm install typescript
 :
/tohoho # echo export PATH=\$PATH:`pwd`/node_modules/.bin >> ~/.bashrc
/tohoho # source ~/.bashrc
/tohoho # tsc --version
Version 4.0.3
```

#### TypeScriptでコードを書く。
##### sample.ts
```ts
function hello(name: string): void {
    console.log("Hello " + name + "!");
}
let your_name: string = "BauWorks";
hello(your_name);
```
#### コンパイル
```
/tohoho # tsc sample.ts
```

#### 実行
```
/tohoho # node sample.js
Hello BauWorks!
```