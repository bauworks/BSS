# 第24回BSS（Material-UI、クロージャとカリー化)

日時　：2020年 11月11日(水)  
参加者：古川(発表者)・有川・森

---
## 今回の趣旨
- Material-UIを使ってマテリアルデザインなコンポーネントを表示
- クロージャとカリー化を学ぶ

## 目次
1. [Material-UI](#1) 
    1. [Material-UIとは](#1-1)
    1. [マテリアルデザインとフラットデザインの違い](#1-2)
    1. [インストール](#1-3)
    1. [ディレクトリ構成](#1-4)
    1. [画面イメージ](#1-5)
    1. [参考サイト](#1-6)

1. [クロージャとカリー化](#2)
    1. [クロージャ](#2-1)
    1. [カリー化](#2-2)
    1. [参考サイト](#2-3)



## 1. Material-UI <a id="1"></a>
### 1.1 Material-UIとは <a id="1-1"></a>
2014年6月にGoogleより発表された新たなデザインガイドであるマテリアルデザインを導入することができるUIコンポーネントライブラリ。
Materialは直訳で「物質的な」「具体的な」という意味で、ユーザーの操作性を重視して、感覚で理解できることを目的としている。

### 1.2 マテリアルデザインとフラットデザインの違い <a id="1-2"></a>
フラットデザインは無駄をそぎ落としたシンプルな平面デザインで、洗練された都会的な印象を与えられる半面、画面上の変化があまりないため重要な要素を目立たせにくくなっている。
一方、マテリアルデザインは影や意味のある動きを加えることで視覚的変化をつけ、ユーザーにわかりやすく表現しています。


### 1.3 インストール <a id="1-3"></a>
今回はReactの開発環境(craete-react-app)にインストールを行った。
インストールしたパッケージは以下のとおりだが、matrial-ui/core 以外は必要に応じてインストールする。
```sh
# yarn add @material-ui/core
# yarn add @material-ui/icons
# yarn add @date-io/date-fns
# yarn add @material-ui/pickers
# yarn add date-fns
# yarn add react-swipeable-views
# yarn add @types/react-swipeable-views
```

### 1.4 ディレクトリ構成 <a id="1-4"></a>
[Material UI]タブ内の構成
```sh
$ tree materialui
reactapps/src/materialui
├── App.tsx                         # タブ内全体コンポーネント
├── components                      # 各コンポーネント例を格納
│   ├── CheckBoxes1.tsx
│   ├── CheckBoxes2.tsx
│   ├── CheckBoxes3.tsx
│   ├── DateTimePickers.tsx
│   ├── FloatingActionButton.tsx
│   ├── FloatingActionButton2.tsx
│   ├── NativeDateTimePicker.tsx
│   ├── RadioGroup.tsx
│   └── TransferList.tsx
├── pages
│   ├── CompsPage.tsx               # コンポーネントページ
│   ├── ProductPage.tsx             # 商品ページ
│   └── TopPage.tsx                 # トップページ
└── templates
    └── GenericTemplate.tsx         # テンプレート

3 directories, 14 files

```

### 1.5 画面イメージ <a id="1-5"></a>
#### ■ トップページ
<p>
<img width="640" alt="トップページ" src="https://user-images.githubusercontent.com/19363285/99186458-c1cc4e80-2793-11eb-85bc-19910025eb52.png">
</p>

#### ■ 商品ページ（テーブルの例）
<p>
<img width="640" alt="商品ページ" src="https://user-images.githubusercontent.com/19363285/99186418-77e36880-2793-11eb-9b6a-1b7f05e4c4f1.png">
</p>

#### ■ コンポーネントページ（各種コンポーネントの例）
<p>
<img width="640" alt="コンポーネントページ" src="https://user-images.githubusercontent.com/19363285/99186300-b4fb2b00-2792-11eb-8575-a2c4e6d84075.png">
</p>


### ソースコード
#### ■ reactapps/public/index.html 
以下のGoogleフォントを追加
```html
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+JP&subset=japanese" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

```

#### ■ App.tsx
```tsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import CompsPage from "./pages/CompsPage";
import TopPage from "./pages/TopPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/materialui/products" component={ProductPage} exact />
        <Route path="/materialui/comps" component={CompsPage} exact />
        <Route path="/materialui" component={TopPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
```


#### ■ TopPage.tsx
```tsx
import React from "react";
import GenericTemplate from "../templates/GenericTemplate";

const TopPage:React.FC = () =>
    <GenericTemplate title="トップページ" >
        <>トップページ内容</>
    </GenericTemplate>
;

export default TopPage;
```

#### ■ ProductPage.tsx
```tsx
import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const createData = (
  name: string,
  category: string,
  weight: number,
  price: number
) => {
  return { name, category, weight, price };
};

const rows = [
  createData("チョコレート", "お菓子", 100, 120),
  createData("ケーキ", "お菓子", 400, 480),
  createData("りんご", "フルーツ", 500, 360),
  createData("バナナ", "フルーツ", 200, 300),
  createData("みかん", "フルーツ", 250, 180),
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProductPage: React.FC = () => {
  const classes = useStyles();

  return (
    <GenericTemplate title="商品ページ">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell align="right">カテゴリー</TableCell>
              <TableCell align="right">重量(g)</TableCell>
              <TableCell align="right">価格(円)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GenericTemplate>
  );
};

export default ProductPage;
```

#### ■ CompsPage.tsx
```tsx
import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckBoxes1 from '../components/CheckBoxes1';
import CheckBoxes2 from '../components/CheckBoxes2';
import CheckBoxes3 from '../components/CheckBoxes3';
import FloatingActionButton from '../components/FloatingActionButton';
import FloatingActionButton2 from '../components/FloatingActionButton2';
//import DateTimePickers from '../components/DateTimePickers';
import NativeDateTimePicker from '../components/NativeDateTimePicker';
import RadioGroup from '../components/RadioGroup';
import TransferList from '../components/TransferList';

const CompsPage:React.FC = () =>
    <GenericTemplate title="コンポーネント" >
        <>Material-UI コンポーネントのサンプル</>
        <ol>
        <li>ボタン</li>
        <Box m={2}>
            <Button variant="contained">Default</Button>
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="contained" disabled>
                Disabled
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>
            <p/>
            <Button>Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button disabled>Disabled</Button>
            <Button href="#text-buttons" color="primary">
                Link
            </Button>
            <p/>
            <Button variant="outlined">Default</Button>
            <Button variant="outlined" color="primary">
            Primary
            </Button>
            <Button variant="outlined" color="secondary">
            Secondary
            </Button>
            <Button variant="outlined" disabled>
            Disabled
            </Button>
            <Button variant="outlined" color="primary" href="#outlined-buttons">
            Link
            </Button>
            <p/>
            <Button onClick={() => { alert('clicked') }}>Click me</Button>
        </Box>

        <li>ボタングループ</li>
        <Box m={2}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            </ButtonGroup>
            <p/>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            </ButtonGroup>
            <p/>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            </ButtonGroup>            
        </Box>

        <li>チェックボックス</li>
        <Box m={2}>
            <CheckBoxes1/>
            <CheckBoxes2/>
            <CheckBoxes3/>            
        </Box>

        <li>フローティングアクションボタン</li>
        <Box m={2}>
            <FloatingActionButton/>
            <FloatingActionButton2/>
        </Box>

        <li>日付＆時間ピッカー</li>
        <Box m={2}>
            {/* <DateTimePickers/> */}
            <NativeDateTimePicker/>   
        </Box>

        <li>ラジオ</li>
        <Box m={2}>
            <RadioGroup/>
        </Box>

        <li>転送リスト</li>
        <Box m={2}>
            <TransferList/>
        </Box>
        </ol>
    </GenericTemplate>
;

export default CompsPage;
```

コンポーネントページ内のコンポーネント例として最初のチェックボックスグループのみ掲載する。
#### ■ CheckBoxes1.tsx
```tsx
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
      <Checkbox disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
      <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
      <Checkbox
        defaultChecked
        indeterminate
        inputProps={{ 'aria-label': 'indeterminate checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
      <Checkbox
        defaultChecked
        size="small"
        inputProps={{ 'aria-label': 'checkbox with small size' }}
      />
    </div>
  );
}
```


### 1.6 参考サイト <a id="1-6"></a>

* [React + Material-UIで管理画面を作成してみた](https://dev.classmethod.jp/articles/react-material-ui/)

* [Material-UI（日本語サイト）](https://material-ui.com/ja/)



## 2. クロージャとカリー化 <a id="2"></a>

### 2.1 クロージャ <a id="2-1"></a>
クロージャは、組み合わされた（囲まれた）関数と、その周囲の状態（レキシカル環境）への参照の組み合わせです。言い換えれば、クロージャは内側の関数から外側の関数スコープへのアクセスを提供します。JavaScript では、関数が作成されるたびにクロージャが作成されます。


#### closure.js
```js
//not Closure
const nonCountDown = () => {
    let time = 10;
    time -= 1;
    console.log(time);
};

console.log("<< nonCountDown >>");
nonCountDown(); // 「9」
nonCountDown(); // 「9」
nonCountDown(); // 「9」


//Closure
const createCountDown = () => {
    let time = 10;
 
    return () => {
        time -= 1;
        console.log(time);
    };
};

const countDown1 = createCountDown();
const countDown2 = createCountDown();
console.log("<< CountDown >>");
countDown1(); // 「9」
countDown2(); // 「9」
countDown1(); // 「8」
countDown2(); // 「8」
countDown1(); // 「7」
countDown2(); // 「7」
```
※「not Closure」は、関数が呼ばれるたびに変数が初期化されるため同じ値が返る。
※「Closure」は、`createCountDown()`の返り値である無名関数が`time`を参照しており、その無名関数を`countDown1`/`countDown2`が保持しているため、`time`は開放されない。



#### closure2.js
```js
const counter = (() => {
  let privateCounter = 0;

  const changeBy = (val) => privateCounter += val;

  return {
    increment: () => changeBy(1),
    decrement: () => changeBy(-1),
    value: () => { return privateCounter }
  };
})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.
```
※クロージャの応用例。返却値の無名関数に定義されたaccessor propertyを経由してカプセル化された`privateCounter`を更新/参照する。


### 2.2 カリー化 <a id="2-2"></a>
カリー化 (currying, カリー化された=curried) とは、複数の引数をとる関数を、引数が「もとの関数の最初の引数」で戻り値が「もとの関数の残りの引数を取り結果を返す関数」であるような関数にすること（あるいはその関数のこと）である。

ごく簡単な例として、f(a, b) = c という関数 f があるときに、F(a) = g（ここで、g は g(b) = c となる関数である）という関数 F が、f のカリー化である。

#### curry.js
```js
// not Curry
console.log("<< non Curry >>")
const add = (x, y) => x + y
console.log( add(2, 3) ) // 5


// Curry
console.log("<< Curry >>")
const curry_add = x => y => x + y
console.log( curry_add(2)(3) )  // 5


console.log("<< Curry usecase>>")
curry_add1 = curry_add(2)
console.log( curry_add1(3) )     // 5
console.log( curry_add1(10) )    // 12
console.log( curry_add1(48) )    // 50
```
※有用な場としては、Wrapper関数を作ることが前提とするような関数(例：Logger)で同等の機能を柔軟に作成することができる。


### 2.3 参考サイト <a id="2-3"></a>
[【JavaScript入門】クロージャって一体何？使い方まで徹底解説](https://www.sejuku.net/blog/25026)
[サルでもわかるカリー化とそのメリット](https://qiita.com/KtheS/items/1a93ba0a6d722a534439)