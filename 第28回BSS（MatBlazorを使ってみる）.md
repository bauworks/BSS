# 第28回BSS（MatBlazorを使ってみる）

日時　：2020年 12月9日(水)  
参加者：古川・有川・森(発表者)

---
## 今回の趣旨
- BlazorWasmをMatBlazorでマテリアルデザイン化

## 目次
1. [MatBlazor使ったらどうなるの？](#1)
1. [前準備](#2)
1. [Todoアイテム入力欄](#3)
1. [Todoアイテムリスト](#4)
1. [リスト下のボタン群](#5)
1. [さいごに](#6)

## 1. MatBlazor使ったらどうなるの？ <a id="1"></a>

こんな感じの画面が  

<img width="1030" 
     alt="bss_the28_01" 
     src="https://user-images.githubusercontent.com/38059866/104194749-107d2880-5465-11eb-85e5-40a981acead0.png">

こんな感じの画面になっちゃいます。  

<img width="1030" 
     alt="bss_the28_02" 
     src="https://user-images.githubusercontent.com/38059866/104194764-14a94600-5465-11eb-8b2a-898653cfa6ae.png">

[MatBlazor公式サイト](https://www.matblazor.com/)

## 2. 前準備 <a id="2"></a>

まずは前準備としてMatBlazorのパッケージを追加し、使用できるように設定

### パッケージの追加

```sh
$ dotnet add package MatBlazor
```

### _imports.razorを編集
■ _imports.razor
```razor
@using MatBlazor
```

### wwwroot/index.htmlを編集
■ index.html
```html
<body>
    <div id="app">Loading...</div>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
    <!-- 下記を追加 -->
    <script src="_content/MatBlazor/dist/matBlazor.js"></script>
</body>
```

これで準備は完了。  

## 3. Todoアイテム入力欄 <a id="3"></a>

ここではチェックボックス、入力欄、ボタンにMatBlazorを使用.

■ TodoMat.razor
```razor
@page "/todomat"

<style>
    .new-item-text-field > label.mat-text-field > span {
        margin-left: 30px;
    }
</style>

<h1>Todo</h1>

<div class="new-item-text-field" style="display: flex; position: relative; align-items: center;">
    <MatCheckbox Style="z-index: 1; position: absolute; left: 0;" 
                 @bind-Value="allChecked" Disabled="@(!TodoItemExists())"></MatCheckbox>
    <MatTextField @bind-Value="newItem" Label="What needs to be done?"
                  OnKeyDown="@Enter" OnInput="@OnInput"
                  Style="z-index: 0; width: 500px; padding-left: 50px;"></MatTextField>
    <MatButton OnClick="@AddItem" Outlined="true">add</MatButton>
</div>
```

### MatCheckbox

チェックボックスのコンポーネント。  
[第25回BSS](./第25回BSS（Blazor-WebAssemblyをvscodeで触ってみる）.md)で作成したTodo画面では入力欄のとこにチェックボックスを付けてなかったが今回追加。

| Name        | Description            |
| ----------- | ---------------------- |
| @bind-Value | バインドする値。true / false   |
| Disabled    | 無効にするかどうか。true / false |

`@bind-Value`には、プロパティallCheckedをバインド。  
コメントの通りです。  
`Disabled`には、メソッドTodoItemExists()の戻り値をバインド。

■ TodoMat.cs
```cs
// newItemのチェック状態
private bool allChecked
{
    get
    {
        // 未完了アイテムがない場合にチェックON、一つでもあればチェックOFF
        return !allTodos.Any(x => !x.IsDone);
    }
    set
    {
        // チェック状態に合わせてTodoアイテムすべてのチェック状態を変更
        allTodos.ForEach(x => x.IsDone = value);
    }
}
        
/// <summary>
/// Todoアイテムが存在するかどうか
/// </summary>
/// <returns></returns>
private bool TodoItemExists()
{
    return allTodos.Any();
}
```

### MatTextField

テキストフィールドのコンポーネント。

| Name        | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| @bind-Value | バインドする値。入力した値を保持。                                                       |
| Label       | 入力項目名。今回はPlaceholder的な使い方してます。HelperTextというのが別に用意されているので本来はこちらの方がいいのかな？ |
| OnKeyDown   | キーダウンイベント。                                                              |
| OnInput     | 入力イベント。                                                                 |

ただ１箇所だけ面倒だった。

<img width="512" 
     alt="bss_the28_03" 
     src="https://user-images.githubusercontent.com/38059866/104194767-1541dc80-5465-11eb-8ffb-320f4a054585.png">

MatTextFieldの`Label`「What needs to be done?」の文字の位置。   
CheckBoxとTextFieldを重ねてるので入力内容はStyle属性でpaddingを指定してやればズラせたが  
`Label`の文字位置は用意されてる属性では触れそうになかったので  
Styleを強引にイジってる。（上記ソースTodoMat.razorの4-6行目）  
これが正解なのかどうかわかりませんがまたどっかで時間作って確認してみます。

### MatButton

ボタンのコンポーネント。

| Name     | Description     |
| -------- | --------------- |
| OnClick  | クリックイベント。       |
| Outlined | ボタンの枠を表示するかどうか。 |

## 4. Todoアイテムリスト <a id="4"></a>

リスト用コンポーネント。MatListとMatListItemを使用。  
今回はStyleのみ指定。

■ TodoMat.razor
```razor
<style>
    .completed-todo-item {
        text-decoration: line-through;
        color: lightgray !important;
    }
</style>
・・・
・・・
<MatList Style="width: 500px">
    @foreach (var item in todosForDisplay)
    {
        <MatListItem Style="padding: 0;">
            <MatCheckbox Style="z-index: 1;" @bind-Value="item.IsDone"></MatCheckbox>
            <MatStringField Style="z-index: 0; width: 100%; position: absolute; padding-left: 50px;" 
                            InputClass="@GetCompletedTodoItemCssClass(item.IsDone)" 
                            @bind-Value="item.Content"></MatStringField>
        </MatListItem>
    }
</MatList>
```

MatListItem内ではMatCheckboxとMatStringFieldを使用。  
MatStringFieldはMatTextFieldと違ってString型専用のコンポーネントっぽい。  
MatTextFieldはintやDateTimeなどの型がバインドできる。

### MatStringField
String専用の入力用コンポーネント。

| Name       | Description     |
| ---------- | --------------- |
| InputClass | input要素のCSSクラス。 |

Styleに「completed-todo-item」を用意し、InputClassに チェック状態によって  
異なるStyle名を返すメソッド「GetCompletedTodoItemCssClass()」をバインド。

■ TodoMat.cs
```cs
/// <summary>
/// Todo完了アイテムCSSクラス名を取得
/// </summary>
/// <param name="isDone">完了フラグ</param>
/// <returns>クラス名</returns>
private string GetCompletedTodoItemCssClass(bool isDone)
{
    return isDone ? "completed-todo-item" : "";
}
```

## 5. リスト下のボタン群 <a id="5"></a>

ボタン用のコンポーネント。

■ TodoMat.razor
```razor
@allTodos.Count(x => !x.IsDone) items left
<MatButton OnClick="@ShowAll" Outlined="true" Style="margin-left: 20px">All</MatButton>
<MatButton OnClick="@ShowActive" Outlined="true">Active</MatButton>
<MatButton OnClick="@ShowCompleted" Outlined="true" Style="margin-right: 20px">Completed</MatButton>
<MatButton OnClick="@ClearCompleted" Outlined="true" 
           Disabled="@(!CompletedTodoItemExists())">Clear completed</MatButton>
```


■ TodoMat.cs
```
/// <summary>
/// 完了済みのTodoアイテムが存在するかどうか
/// </summary>
/// <returns></returns>
private bool CompletedTodoItemExists()
{
    return allTodos.Any(x => x.IsDone);
}
```

## 6. さいごに <a id="6"></a>

使ってみた感じ、CSSの知識がない人にとっては嬉しいとは思うが  
Webの知識がある人からすると物足りなさそうな感じがする。  
ちょっと細かいことに拘るとCSSの知識も必要になってくる。  
ドキュメントはわかりやすかったのですんなり使えた。  
他にもBlazor向けのコンポーネントで良さそうなのがあったらまた紹介する。