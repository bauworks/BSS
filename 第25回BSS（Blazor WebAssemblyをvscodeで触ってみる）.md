# 第25回BSS（Blazor WebAssemblyをvscodeで触ってみる)

日時　：2020年 11月18日(水)  
参加者：古川・有川・森(発表者)

---
## 今回の趣旨
- Blazor WebAssemblyを学ぶ
- Todoページを追加してみる

## 目次
1. [はじめに](#1)
1. [プロジェクト作成](#2)
1. [プロジェクト構成](#3)
1. [アプリ起動](#4)
1. [ソースを確認](#5)
1. [Todoを追加してみる](#6)
1. [さいごに](#7)

## 1. はじめに <a id="1"></a>
Blazorには２種類のモデルがあり、サーバーサイドで動作するBlazor Serverと、  
ブラウザ上で動作するBlazor WebAssemblyがある。

Blazor Serverは、サーバー上の.NET Core環境で主な処理が行われ、サーバー側がブラウザのDOMを変更する。  
Blazor WebAssemblyは、最初に.NETアセンブリとランタイムがブラウザにダウンロードされ  
ブラウザ上で.NETコードを実行し、別途プラグインなどは不要。

vscodeでBlazor WebAssemblyプロジェクトを作成して、  
さらに [TodoMVC](http://todomvc.com/) のようなTodoページを追加してみた。

## 2. プロジェクト作成 <a id="2"></a>
まずは任意の場所で下記コマンドを叩いてプロジェクトを作成。
```sh
$ dotnet new blazorwasm -o BlazorWasmSample
```
## 3. プロジェクト構成 <a id="3"></a>
確認すると初めからテンプレート的な感じで３つほどページが用意されている。
```
BlazorWasmSample
  ├── App.razor
  ├── BlazorWasmSample.csprojs
  ├── Pages
  │   ├── Counter.razor
  │   ├── FetchData.razor
  │   └── Index.razor
  ├── Program.cs
  ├── Properties
  │   └── launchSettings.json
  ├── Shared
  │   ├── MainLayout.razor
  │   ├── MainLayout.razor.css
  │   ├── NavMenu.razor
  │   ├── NavMenu.razor.css
  │   └── SurveyPrompt.razor
  ├── _Imports.razor
  └── wwwroot
      ├── css
      │   ├── app.css
      │   ├── bootstrap
      │   │   ├── bootstrap.min.css
      │   │   └── bootstrap.min.css.map
      │   └── open-iconic
      │       ├── FONT-LICENSE
      │       ├── ICON-LICENSE
      │       ├── README.md
      │       └── font
      │           ├── css
      │           │   └── open-iconic-bootstrap.min.css
      │           └── fonts
      │               ├── open-iconic.eot
      │               ├── open-iconic.otf
      │               ├── open-iconic.svg
      │               ├── open-iconic.ttf
      │               └── open-iconic.woff
      ├── favicon.ico
      ├── index.html
      └── sample-data
          └── weather.json
```

## 4. アプリ起動 <a id="4"></a>
下記コマンドで実行。
```sh
$ dotnet run
```

http://localhost:5000 にアクセス。  
シンプルで今風な感じの画面が表示される。  

### ■ Homeメニュー
<img width="958" 
     alt="bss_the25_01" 
     src="https://user-images.githubusercontent.com/38059866/103462777-f3f93600-4d6a-11eb-8f84-52e37a9140bb.png">

### ■ Counterメニュー  
ボタンをポチポチするとカウントアップされる。
<img width="958" 
     alt="bss_the25_02" 
     src="https://user-images.githubusercontent.com/38059866/103462778-f5c2f980-4d6a-11eb-976f-5f8adf34eee6.png">

### ■ Fetch dataメニュー  
Grid的な表の画面。  
標準のtableなので編集やソートなどフィルタリングなどはできない。  
(このあたりはいい感じのパッケージがないかまた探してみる)
<img width="958" 
     alt="bss_the25_03" 
     src="https://user-images.githubusercontent.com/38059866/103462779-f65b9000-4d6a-11eb-9499-bfd5997e9a4f.png">

## 5. ソースを確認 <a id="5"></a>
Counterページのソース

■ Counter.razor
```razor
@page "/counter"

<h1>Counter</h1>

<p>Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

ボタンをクリックすると`@code`内の変数`currentCount`がインクリメントされ  
画面上の`@currentCount`に反映される。

## 6. Todoを追加してみる <a id="6"></a>
### 追加 / 編集ファイル
追加、編集するファイルは下記の４つだけ。

```
BlazorWasmSample
  ├── Pages
  │   ├── Todo.cs
  │   └── Todo.razor
  ├── Shared
  │   ├── NavMenu.razor
  ├── TodoItem.cs
  ・・・
```

### TodoItemクラス追加
まずはTodoアイテムのクラスを追加。

■ TodoItem.cs
```cs
public class TodoItem
{
    public string Content {get; set;}
    public bool IsDone {get; set;}
}
```
### Viewと処理を分けてファイルを追加
次に画面と処理だが、コードが長くなってしまうのでrazorファイルにはViewのみとし、処理はpartialクラスにしてTodo.csと、ファイルを２つに分けて追加。

■ Todo.razor
```razor
@page "/todo"

<h1>Todo</h1>

・・・
```

■ Todo.cs
```cs
namespace BlazorWasmSample.Pages
{
    public partial class Todo
    {
        ・・・
    }
}
```

### 入力したTodoアイテムを追加
Todoを入力してEnterでどんどん追加していくようにする。  
※現状、Enterを2回押さないとリストに追加されないのでまた時間ある時にデバッグして調べてみます。。。

■ Todo.razor
```razor
<input style="width: 100%" placeholder="What needs to be done?" @bind="newItem" @onkeydown="@Enter" />
```

■ Todo.cs
```cs
// Todoアイテム全て
private List<TodoItem> allTodos = new List<TodoItem>();
// 追加するアイテム
private string newItem;
// 表示用のTodoアイテム
private List<TodoItem> todosForDisplay = new List<TodoItem>();
// 現在の表示状態
private State currentState;
// 表示状態
private enum State
{
    All,
    Active,
    Completed,
}

/// <summary>
/// アイテムを追加
/// </summary>
private void AddItem() {
    if (!string.IsNullOrWhiteSpace(newItem))
    {
        allTodos.Add(new TodoItem() { Content = newItem, });
        this.ShowTodo();
        newItem = string.Empty;
    }
}

/// <summary>
/// Todoアイテムを表示
/// </summary>
private void ShowTodo()
{
    switch (this.currentState)
    {
        case State.All:
            todosForDisplay = allTodos;
            break;
        case State.Active:
            todosForDisplay = allTodos.Where(x => !x.IsDone).ToList();
            break;
        case State.Completed:
            todosForDisplay = allTodos.Where(x => x.IsDone).ToList();
            break;
    }
}

/// <summary>
/// Enterキーイベント
/// </summary>
/// <param name="e">イベントデータ</param>
private void Enter(KeyboardEventArgs e)
{
    Console.WriteLine($"KeyboardEventArgs : Code[{e.Code}] Key[{e.Key}]");
    if (e.Key == "Enter")
    {
        this.AddItem();
    }
}
```

### Todoリスト表示
追加したアイテムは下記のように表示。  
TodoItem.IsDoneをCheckBoxに、TodoItem.ContentをTextBoxにバインド。

■ Todo.razor
```razor
<ul>
    @foreach (var item in todosForDisplay)
    {
        <li>
            <input type="checkbox" @bind="item.IsDone" />
            <input @bind="item.Content"/>
        </li>
    }
</ul>
```

### Todoアイテムのチェック変更
追加したアイテムのCheckをONにすると取消線を入れ文字色をグレーに、  
OFFにすると黒に戻すようスタイルと処理を追加。

■ Todo.razor
```razor
<ul>
    @foreach (var item in todosForDisplay)
    {
        <li>
            <input type="checkbox" @bind="item.IsDone" />
            <input @bind="item.Content" style="color: @GetTextStyles(item).foreColor; text-decoration: @GetTextStyles(item).decoration"/>
        </li>
    }
</ul>
```
色と装飾をTupleで返す。

■ Todo.cs
```cs
/// <summary>
/// Todoアイテムのテキストスタイルを取得
/// </summary>
/// <param name="item">Todoアイテム</param>
/// <returns>文字色と取消線を付けるかどうかのセット</returns>
private (string foreColor, string decoration) GetTextStyles(TodoItem item)
{
    return item.IsDone ? ("lightgray", "line-through") : ("black", "none");
}
```

<img width="958" 
     alt="bss_the25_04" 
     src="https://user-images.githubusercontent.com/38059866/103462781-f6f42680-4d6a-11eb-9728-5e680d26aa5b.png">

### 未完了アイテムの残数表示
未完了のActiveなTodoItemのカウントを左下に表示。  
View側に直接LINQでバインド。

■ Todo.razor
```razor
@allTodos.Count(x => !x.IsDone) items left
```

### 表示内容の切り替え
全て / 未完了 / 完了と表示を切り替えるボタンを追加し、メソッドをView側でバインドする。

■ Todo.razor
```razor
<button @onclick="ShowAll">All</button>
<button @onclick="ShowActive">Active</button>
<button @onclick="ShowCompleted">Completed</button>
```
■ Todo.cs
```cs
/// <summary>
/// Todoアイテム全て表示
/// </summary>
private void ShowAll() {
    currentState = State.All;
    this.ShowTodo();
}

/// <summary>
/// Todo未完了アイテム表示
/// </summary>
private void ShowActive() {
    currentState = State.Active;
    this.ShowTodo();
}

/// <summary>
/// Todo完了アイテム表示
/// </summary>
private void ShowCompleted() {
    currentState = State.Completed;
    this.ShowTodo();>
}
```

<img width="958" 
     alt="bss_the25_05" 
     src="https://user-images.githubusercontent.com/38059866/103462783-f6f42680-4d6a-11eb-843a-d44163b4f82d.png">
<img width="958" 
     alt="bss_the25_06" 
     src="https://user-images.githubusercontent.com/38059866/103462784-f78cbd00-4d6a-11eb-8e39-c64ff605616e.png">

### 完了アイテムのクリア
完了アイテムが一つ以上ある場合はClear completedボタンを表示するようにし、  
クリックで完了アイテムをメモリから削除。

■ Todo.razor
```razor
<button @onclick="ClearCompleted" style="display: @GetDisplay()">Clear completed</button>
```
■ Todo.cs
```cs
/// <summary>
/// Todo完了アイテムをクリア
/// </summary>
private void ClearCompleted()
{
    var completedTodos = allTodos.Where(x => x.IsDone);
    allTodos = allTodos.Except(completedTodos).ToList();
    this.ShowTodo();
}

/// <summary>
/// ClearCompletedボタン表示スタイルを取得
/// </summary>
/// <returns>表示スタイル [inline-block / none]</returns>
private string GetDisplay()
{
    return allTodos.Any(x => x.IsDone) ? "inline-block" : "none";
}
```

### メニューへTodoページを追加
最後に、Todo.razorで指定した`@page "/todo"`へのリンクをメニューに追加。

■ NavMenu.razor
```razor
<div class="@NavMenuCssClass" @onclick="ToggleNavMenu">
    <ul class="nav flex-column">
        <li class="nav-item px-3">
            <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
                <span class="oi oi-home" aria-hidden="true"></span> Home
            </NavLink>
        </li>
        <li class="nav-item px-3">
            <NavLink class="nav-link" href="counter">
                <span class="oi oi-plus" aria-hidden="true"></span> Counter
            </NavLink>
        </li>
        <li class="nav-item px-3">
            <NavLink class="nav-link" href="fetchdata">
                <span class="oi oi-list-rich" aria-hidden="true"></span> Fetch data
            </NavLink>
        </li>
        <li class="nav-item px-3">
            <NavLink class="nav-link" href="todo">
                <span class="oi oi-list-rich" aria-hidden="true"></span> Todo
            </NavLink>
        </li>
    </ul>
</div>
```

<img width="958" 
     alt="bss_the25_07" 
     src="https://user-images.githubusercontent.com/38059866/103462785-f78cbd00-4d6a-11eb-8916-7be86ef0ea26.png">

## 7. さいごに <a id="7"></a>
思ってたよりもスッキリとコードが書けるのでサクっと作れた。  
ただブラウザにランタイムや.NETアセンブリをダウンロードして実行するので  
機能の多いアプリにしてしまうとダウンロードに時間がかかってしまうよう。  
それでも手軽にSPAをC#で作れちゃうってなかなかイイ！！！
