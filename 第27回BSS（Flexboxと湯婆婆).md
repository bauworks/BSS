# 第27回BSS（Flexboxと湯婆婆)

日時　：2020年 12月2日(水)  
参加者：古川(発表者)・有川・森

---
## 今回の趣旨
- Flexboxを学ぶ
- FlexboxとReactでリッチな湯婆婆を作ってみた

## 目次
1. [Flexboxを学ぶ](#1) 
    1. [Flexboxとは](#1-1)
    1. [使い方](#1-2)
    1. [コンテナ（親要素）のプロパティ](#1-3)
    1. [アイテム（子要素）のプロパティ](#1-4)
    1. [Flexboxを色々試してみよう](#1-5)

1. [FlexboxとReactでリッチな湯婆婆を作ってみた](#2)
    1. [画面イメージ](#2-1)
    1. [ディレクトリ構成](#2-2)
    1. [ソースコード](#2-3)
    1. [参考サイト](#2-4)



## 1. Flexboxを学ぶ <a id="1"></a>
### 1.1 Flexboxとは <a id="1-1"></a>
`Flexible Box Layout Module`のことで、フレキシブルにアイテムを配置できるレイアウトモード。
#### << 特徴 >>
- 要素内の縦横の配置が簡単にできる(複雑なコードを書く必要がない)。
- HTMLでの要素の順番にかかわらず、CSSだけで自由に表示順序を変えることができる。
- 要素間の幅の指定も柔軟にでき、要素内の分量が違っても、高さや幅を調整できる。
- 要素間の余白の設計をそれほど気にする必要がない。



### 1.2 使い方 <a id="1-2"></a>
CSS Flexboxは、 コンテナ（親要素）とアイテム（子要素）という2つの要素によって構成されます。

```html
    <div id="container">
        <div id="item_a"><p>A</p></div>
        <div id="item_b"><p>B</p></div>
        <div id="item_c"><p>C</p></div>
        <div id="item_d"><p>D</p></div>
        <div id="item_e"><p>E</p></div>
    </div>
```
※ `id="container"`がコンテナで、`item_a`〜`item_e`がアイテム


### 1.3 コンテナ（親要素）のプロパティ <a id="1-3"></a>

  1.  `flex-direction` : アイテムの並び順を指定する
      1. row（デフォルト）
          - アイテムを水平方向に左から右へと配置
      1. row-reverse
          - アイテムを水平方向に右から左へと配置
      1. column
          - アイテムを垂直方向に上から下へと配置
      1. colmn-reverse
          - アイテムを垂直方向に下から上へと配置


  1. `flex-wrap` : アイテムの折り返しを指定する
      1. nowrap（デフォルト）
          - アイテムを折り返さずに一列に配置
      1. wrap
          - 複数行のアイテムを上から下へと配置
      1. wrap-reverse
          - 複数行のアイテムを下から上へと配置

  1. `flex-flow` : アイテムの並び順と折り返しを一括で指定する

  1. `justify-content` : アイテムの水平方向の位置を指定する
      1. flex-start（デフォルト）
          - アイテムを左揃えで配置
      1. flex-end
          - アイテムを右揃えで配置
      1. center
          - アイテムを左右中央揃えで配置
      1. space-between
          - 両端のアイテムを余白を空けずに配置し、他の要素は均等に間隔を空けて配置
      1. space-around
          - 両端のアイテムも含めて、均等な間隔を空けて配置


  1. `align-items` : アイテムの垂直方向の位置を指定する
      1. stretch（デフォルト）
          - アイテムを上下の余白を埋めるように配置
      1. flex-start
          - アイテムを上揃えで配置
      1. flex-end
          - アイテムを下揃えで配置
      1. center
          - アイテムを上下中央揃えで配置
      1. baseline
          - アイテムをベースラインに合わせて配置

  1. `align-content` : アイテムの行の垂直方向の位置を指定する
      1. stretch（デフォルト）
          - アイテムの行を余白を埋めるように配置
      1. flex-start
          - アイテムの行を上揃えで配置
      1. flex-end
          - アイテムの行を下揃えで配置
      1. center
          - アイテムの行を上下中央揃えで配置
      1. space-between
          - 最上行と最下行のアイテムを余白を空けずに配置し、他のアイテム行は均等に間隔を空けて配置
      1. space-around
          - 最上行と最下行のアイテムを余白を空けずに配置し、他のアイテム行は均等に間隔を空けて配置


### 1.4 アイテム（子要素）のプロパティ <a id="1-4"></a>
  1. `order` : アイテムの並び順を指定

  1. `flex-grow` : アイテムの伸び率を指定

  1. `flex-shrink` : アイテムの縮み率を指定

  1. `flex-basis` : アイテムのベースの幅を指定

  1. `flex` : アイテムの伸び率、縮み率、ベースの幅を一括指定

  1. `align-self` : アイテムの垂直方向の位置を指定
      1. auto（デフォルト）
          - 親要素のalign-itemsの値を使用
      1. flex-start
          - アイテムを上揃えで配置
      1. flex-end
          - アイテムを下揃えで配置
      1. center
          - アイテムを中央揃えで配置
      1. baselne
          - アイテムをベースラインに合わせて配置
      1. stretch
          - アイテムを上下の余白を埋めるように配置


### 1.5 Flexboxを色々試してみよう <a id="1-5"></a>
Additionalからダウンロードして実行し、色々ボタンを押してみてください。
<p>
<img width="640" alt="Flexbox" src="https://user-images.githubusercontent.com/19363285/101283359-24f25380-381d-11eb-93a8-e14ec60f60e8.png">
</p





## 2. FlexboxとReactでリッチな湯婆婆を作ってみた <a id="2"></a>

Flexboxの例として少し前にQiitaで流行った湯婆婆をReactで作ってみました。<br>

### 2.1 画面イメージ <a id="2-1"></a>
<p>
<img width="640" alt="湯婆婆" src="https://user-images.githubusercontent.com/19363285/101284247-5d486080-3822-11eb-8527-a3336912dc41.png">
</p>

<p>
<img width="640" alt="湯婆婆" src="https://user-images.githubusercontent.com/19363285/101284252-5faaba80-3822-11eb-85f8-58d679064e61.png">
</p>

### 2.2 ディレクトリ構成 <a id="2-2"></a>
[Yubarba]タブ内の構成
```sh
$ tree yubarba/
yubarba/
├── App.tsx                 # アプリメイン
├── Contract.tsx            # 契約書コンポーネント
├── Serif.tsx               # 湯婆婆のセリフコンポーネント
└── YubarbaContext.tsx      # 湯婆婆のセリフコンテキスト

0 directories, 4 files
```


### 2.3 ソースコード <a id="2-3"></a>

#### ● App.tsx
湯婆婆のセリフコンポーネントと契約書をFlexboxを使って両端上揃えで配置しています。<br>
この段階では契約書も上揃えですが、コンポーネントの個別指定で下に揃えます。
湯婆婆のセリフとそのリデューサーをプロバイドしていますが、このしくみは以前のコードと全く同じです。
```tsx
import React from 'react'
import { YubarbaContextProvider } from "./YubarbaContext";
import Serif from './Serif';
import Contract from './Contract';

const App:React.FC = () => {

  const AppStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "600px",
    background: "url(http://www.ghibli.jp/gallery/chihiro016.jpg)",
    backgroundSize: "cover",
  };
  return(
    <div style={AppStyle} >
      <YubarbaContextProvider>
        <Serif/>
        <Contract/>
      </YubarbaContextProvider>
    </div>
  );
}

export default App;
```
#### ● Contract.tsx
契約書コンポーネント<br>
`alignSelf: "flex-end"` により下揃えにしています。

```tsx
import React from 'react'
import { YubarbaContext } from "./YubarbaContext";

const Contract:React.FC = () => {

  const { requestYubarba } = React.useContext(YubarbaContext);


  const [sign, setSign] = React.useState<string>("");
  const handleSign = (event:any) => {
    setSign(event.target.value);
  }

  const handlePushButton = () => {
    requestYubarba({type: "signed", value: sign})
  }

  // 全体のスタイル
  const style = {
    alignSelf: "flex-end",
    margin: "20px",
    padding: "15px",
    backgroundColor: "#ffffff",
  };

  // 「契約書」のスタイル
  const titleStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "5em",
  };

  // 署名入力欄のスタイル
  const signStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "16em",
  };


  return(
    <div style={style}>
      <p style={titleStyle}><b><u>契 約 書</u></b></p>
      <p>乙在甲的指导下在这家温泉酒店工作。</p>
      <p style={signStyle}>
        甲：温泉旅馆老板 湯婆婆<br/>
        乙：<input type="text" name="sign" value={sign} onChange={handleSign} />
        <button type="button" onClick={handlePushButton}>
        印
        </button>
      </p>
    </div>
  );
}

export default Contract;
```
#### ● Serif.tsx
湯婆婆のセリフコンポーネント
```tsx
import React from 'react'
import { YubarbaContext } from "./YubarbaContext";

const Serif:React.FC = () => {

  const style = {
    margin: "20px",
    padding: "5px",
    backgroundColor: "rgba(255,255,255,0.7)",
    border: "5px solid rgba(0,0,0,0.4)",
    backdropFilter: "blur(5px)",
  };

  //const { serif } = useYubarbaContext();
  const { serif } = React.useContext(YubarbaContext);
  const formated = serif.split('\n').map((str, index) => (
    <React.Fragment key={index}>{str}<br /></React.Fragment>
  ))
  return(
    <div style={style}>
      {formated}
    </div>
  );
}

export default Serif;
```
#### ● YubarbaContext.tsx
湯婆婆のコンテキスト<br>
このアプリ唯一のロジック部分。湯婆婆のセリフを制御しuseContextを使って他コンポーネントから参照可能にしています。
```tsx
import * as React from "react";


//--------------------------------
// コンテキストの生成 & エクスポート
//--------------------------------
// コンテキストの型定義
type YubarbaContextType = {
  serif: string;
  requestYubarba: React.Dispatch<Action>;
};
// createContext()のためのダミーオブジェクト
const dummy:YubarbaContextType = {
  serif: "",
  requestYubarba: () => {}
}
// 生成とエクスポート
export const YubarbaContext = React.createContext<YubarbaContextType>(dummy);


//--------------------------------
// Reducer定義
//--------------------------------
type State = string;
type Action = { type: string, value: string };
const serifReducer = (state: State, action: Action) => {
  if (action.type === "signed" && action.value !== "") {
    // const newName = action.value.substr(Math.floor(Math.random() * action.value.length), 1);
    const randamIndex = Math.round(Math.random() * (Array.from(action.value).length - 1));
    const newName = Array.from(action.value)[randamIndex];    
    return "フン。" + action.value + "というのかい。\n贅沢な名だねぇ。\n今からお前の名前は" + newName + "だ。\nいいかい、" + newName + "だよ。\n分かったら返事をするんだ、" + newName + "!!";
  }
  return "サインしろって言っただろ!!";
};


//--------------------------------------------
// 関数コンポーネント：SerifContextのプロパイダを返す
//--------------------------------------------
export const YubarbaContextProvider: React.FC = ({ children }) => {

  // useReducer：コンテキスト実体とコンテキスト編集関数を取得
  const [serif, requestYubarba] = React.useReducer(serifReducer, "契約書だよ。\nそこに名前を書きな。");

  return (
    // SerifContextをプロバイド
    <YubarbaContext.Provider value={{ serif, requestYubarba }}>
      {children}
    </YubarbaContext.Provider>
  );
};
```

### 2.4 参考サイト <a id="2-4"></a>
* [もう迷わない！CSS Flexboxの使い方を徹底解説](https://webdesign-trends.net/entry/8148)
* [C# で湯婆婆を Windows アプリと WebAssembly 対応してみた（無駄に MVVM）](https://qiita.com/okazuki/items/abf0469527c2e67b4840)