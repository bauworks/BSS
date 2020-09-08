# 第14回BSS（Vue.jsを触ってみる）

日時　：2020年9月2日(水)  
参加者：有川(発表者) ・古川・森  

---
## 今回の趣旨
- 第11回BSSでReactで作ったサンプル(todoアプリ)をVue.jsを使って作ってみる。

## 目次
0. [Vue.jsとは](#0Vuejsとは)  
1. [HTML作成](#1HTML作成)  
2. [スクリプト作成](#2スクリプト作成)  
3. [完成](#3完成)


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