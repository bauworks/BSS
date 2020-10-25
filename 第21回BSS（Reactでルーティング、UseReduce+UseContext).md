# 第21回BSS（Reactでルーティング、UseReduce+UseContext)

日時　：2020年 10月21日(水)  
参加者：古川(発表者) ・有川  

---
## 今回の趣旨
- react-routerを使ってページ遷移する
- UseReduce+UseContextでコンテキストをグローバルに参照する

## 目次
1. [react-routerでルーティング](#1-react-routerでルーティング)  
2. [コンテキストをグローバルに参照する](#2-コンテキストをグローバルに参照する)  
 2.1 [シンプルにコンテキスト参照](#21-シンプルにコンテキスト参照)<br>
 2.2 [ベストプラクティスなコンテキスト参照（useReducer + useContext）](#22-ベストプラクティスなコンテキスト参照（useReducer-+-useContext）)
3. [参考サイト](#3-参考サイト)


## 1. react-routerでルーティング
ルーティングとは表示させるページをURLにより切り替える処理のこと。
この機能をReactで実現するにあたって、デファクトスタンダードと思われるのがreact-router です。


### 実行結果
<img width="320" alt="react-route" src="https://user-images.githubusercontent.com/19363285/97106928-d58e1300-1707-11eb-92d4-fe930f3fe056.gif">


### ディレクトリ構成
```sh
page
├── PageMain.tsx        # メニューボタン表示とルーティング設定
├── page1
│   └── page1.tsx       # ページ１
└── page2
    └── page2.tsx       # ページ２
```

### インストール
```sh
$ yarn add react-router-dom --save
$ yarn add @types/react-router-dom
```

### ソースコード
#### PageMain.tsx
```tsx
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {Page1} from './page1/page1';
import {Page2} from './page2/page2';

const pathRoot = "/page";
const pathPage1 = pathRoot + "/page1"
const pathPage2 = pathRoot + "/page2"

const PageMenu = () => {
    return (
      <div>
        <Link to={pathPage1}>
          <button>Page1</button>
        </Link>
        <Link to={pathPage2}>
          <button>Page2</button>
        </Link>
      </div>
    );
};
  
export const PageMain = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path={pathRoot} component={PageMenu} />
          <Route path={pathPage1} component={Page1} />
          <Route path={pathPage2} component={Page2} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default PageMain;
```
※以下のように`<PageMenu/>`コンポーネントのRouteの属性に"exact"を追加すると完全一致の場合のみ有効となるので、`<Page1/>`や`<Page2/>`を表示しているときは`<PageMenu/>`を表示しない。
##### exactを指定したときの例
```tsx
<Route path={pathRoot} exact component={PageMenu} />
```

#### page1.tsx
```tsx
import React from "react";
export const Page1 = () => {
  return <h1>Page1</h1>;
};
```
#### page2.tsx
```tsx
import React from "react";
export const Page2 = () => {
  return <h1>Page2</h1>;
};
```


## 2. コンテキストをグローバルに参照する

コンテキストとは文脈、前後関係、事情、背景、状況などの意味を持つ英単語。ITの分野では、利用者の意図や状況、環境などの総体を表したり、同じ処理や記述でも状況に応じて動作などが異なる場合に、その選択基準となる判断材料や条件などを指す場合が多い。([IT用語辞典：e-Words](http://e-words.jp/w/%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88.html))


## 2.1 シンプルにコンテキスト参照

### 実行結果
<img width="320" alt="simpleにコンテキスト" src="https://user-images.githubusercontent.com/19363285/97108739-acbf4b00-1712-11eb-929e-bf6bf61a2509.png">


### ディレクトリ構成
```sh
simplectx/
├── Context.tsx     # コンテキストプロパイダ（CompAを内包）
├── CompA.tsx       # CompBを内包
├── CompB.tsx       # CompCを内包
└── CompC.tsx       # コンテキストを参照
```

### ソースコード
#### Context.tsx
```tsx
import React, {createContext, useState} from 'react'
import {CompA} from './CompA'

//UserContextとHobbyContextを作成
type UserContextType = {
  name: string;
  age: number;
};
export const UserContext = createContext<UserContextType>({} as UserContextType);
export const HobbyContext = createContext<string>("Default");


//------------------
// 関数コンポーネント
//------------------
export const Context:React.FC = () => {

  //useStateを使ってUserContextの初期値作成
  //（↓setUser未使用ワーニングの回避）
  // eslint-disable-next-line
  const [user, setUser] = useState<UserContextType>({
    name: '山田太郎',
    age: 22
  })

  //useStateを使ってhobbyを作成
  //const [hobby, setHobby] = useState('柔道')

  return (
    <div>
      <UserContext.Provider value={user}>
        <HobbyContext.Provider value="野球">
          <CompA/>
        </HobbyContext.Provider>
      </UserContext.Provider>
    </div>
  )
}
```


#### CompA.tsx
```tsx
import React from "react";
import {CompB} from "./CompB";

export const CompA:React.FC = () => {
  return <CompB/>;
};
```

#### CompB.tsx
```tsx
import React from "react";
import {CompC} from "./CompC";

export const CompB:React.FC = () => {
  return <CompC/>;
};
```

#### CompC.tsx
```tsx
import React, {useContext} from 'react'
import {UserContext, HobbyContext} from './Context'

export const CompC:React.FC = () => {
  const user = useContext(UserContext)
  const hobby = useContext(HobbyContext)
  return (
    <p>{user.name}{user.age}歳: 趣味は{hobby}です。</p>
  )
}
```



### 2.2 ベストプラクティスなコンテキスト参照（useReducer + useContext）

### 実行結果
<img width="320" alt="ベストプラクティスと思われるコンテキスト参照" src="https://user-images.githubusercontent.com/19363285/97110070-7dacd780-171a-11eb-8e33-a1c94d56bab3.gif">


### ディレクトリ構成
```sh
reducectx/
├── ItemsProvider.tsx   # コンテキストプロバイダ（コンテキストとReducer）
├── App.tsx             # メインページ
├── Title.tsx           # タイトル表示（コンテキストとは無関係）
├── List.tsx            # アイテムのリスト表示
└── Item.tsx            # アイテム
```


### ソースコード
#### ItemsProvider.tsx
```tsx
import * as React from "react";

//型定義
type ItemsType = string[];
type ActionType = { index: number };
type ItemsContextType = {
  items: ItemsType;
  deleteItem: React.Dispatch<ActionType>;
};

//Itemsコンテキストを生成してエクスポート
const ItemsContext = React.createContext<ItemsContextType>({
  items: [],
  deleteItem: () => {}
});
export const useItemsContext = () => React.useContext<ItemsContextType>(ItemsContext);

//ItemsコンテキストのReducer関数を定義
const itemsReducer = (items: ItemsType, action: ActionType):string[] => {
  return items.filter((_, i) => i !== action.index);
};

//--------------------
//関数コンポーネント
//--------------------
export const ItemsContextProvider: React.FC = ({children}) => {

  //useReducer()でItemsコンテキストの初期値とReducer関数を紐付ける
  const [items, deleteItem] = React.useReducer(itemsReducer, [
    "DATA-00",
    "DATA-01",
    "DATA-02",
    "DATA-03",
    "DATA-04",
    "DATA-05",
    "DATA-06",
    "DATA-07",
    "DATA-08",
    "DATA-09",
    "DATA-10",
  ]);

  return (
    //Itemsコンテキストを提供可能にする
    <ItemsContext.Provider value={{items, deleteItem}}>
      {children}
    </ItemsContext.Provider>
  );
};
```
※コンテキストに関連する記述を一つにまとめ、useContextの結果とコンテキストプロバイダーのみをエクスポートすることで、できるだけ参照側と疎結合にしている。


#### App.tsx
```tsx
import * as React from "react";
import { ItemsContextProvider } from "./ItemsProvider";
import { Title } from "./Title";
import { List } from "./List";

export const App = () => {
  return (
    <ItemsContextProvider>
      <Title title="タイトル" />
      <List />
    </ItemsContextProvider>
  );
};

export default App;
```


#### Title.tsx
```tsx
import React from "react";

type Props = {
  title: string;
};

export const Title = (props: Props) => {
  const { title } = props;

  return <h2>{title}</h2>;
};
```


#### List.tsx
```tsx
import React from "react";

import { Item } from "./Item";
import { useItemsContext } from "./ItemsProvider";

export const List = () => {
  const { items } = useItemsContext();

  return (
    <div>
      {items.map((o, index) => (
        <Item data={o} index={index} />
      ))}
    </div>
  );
};
```


#### Item.tsx
```tsx
import React from "react";
import { useItemsContext } from "./ItemsProvider";

type Props = {
  data: string;
  index: number;
};

export const Item = (props: Props) => {
  const { data, index } = props;
  const { deleteItem } = useItemsContext();

  const clickHandler = () => deleteItem({ index });

  return (
    <div onClick={clickHandler}>
      Item({index}) : {data} 
    </div>
  );
};
```


## 3. 参考サイト
[React Routerでのページ遷移を簡単に説明](https://qiita.com/kuropp/items/0490c26f85bcdd181cb1)

[React hooksを基礎から理解する (useContext編)](https://qiita.com/seira/items/fccdf4e73c59c491558d)

[「Redux よさようなら」最強の React 実装](https://uncle-javascript.com/react-typescript-hooks-best-practice)