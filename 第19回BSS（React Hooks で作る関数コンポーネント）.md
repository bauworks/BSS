# React Hooksで作る関数コンポーネント

日時　：2020年10月7日(水)  
参加者：古川(発表者)・有川  

---

## 今回の趣旨
Reactの「クラスコンポーネント」と「関数コンポーネント」の違いを理解し、React Hooksを使って、クラスコンポーネントを関数コンポーネントに書き換えてみる。


## 目次
1. [クラスコンポーネントと関数コンポーネント](#1-クラスコンポーネントと関数コンポーネント)
1. [React Hooks とは](#2-React-Hooks-とは)
1. [クラスコンポーネントをReactHooksを使って関数コンポーネントにしてみよう](#3-クラスコンポーネントをReactHooksを使って関数コンポーネントにしてみよう)
1. [参考サイト](#4-参考サイト)



## 1. クラスコンポーネントと関数コンポーネント

### ■ 関数コンポーネント
JavaScriptの関数で書かれたコンポーネント
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### ■ クラスコンポーネント
ES6クラスで書かれたコンポーネント
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上記２つのコンポーネントでは同じ結果が返ってくるが、関数コンポーネントは状態を持つことが出来ないのに対し、クラスコンポーネントはReact.Componentを継承しているので、stateとライフサイクルの機能を利用することが可能。


```js
import React from  'react';

class CountUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount(){
    console.log("コンポーネントのマウント後")
  }
  componentDidUpdate(){
    console.log("コンポーネントがアップデートされた後")
  }
  componentWillUnmount(){
    console.log("コンポーネントがアンマウントされた後")
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <h1>クラスコンポーネント</h1>
        <p>[1] {this.state.count} 回クリックしました。</p>
        <button onClick={this.handleClick.bind(this)}>Click!</button>
      </div>
    );
  }
}
```
※ よく使うと思われるライフサイクルイベントのみを記載。

ReactでWebアプリケーションを作るにあたって、クラスコンポーネントは便利な機能であったが、いくつかの問題があった。（React公式サイトより）

+ ステートフルなロジックをコンポーネント間で再利用するのは難しい
+ 複雑なコンポーネントは理解しづらくなる
+ クラスは人間と機械の両方を混乱させる




## 2. React Hooks とは
StateなどのReactの機能を、クラスを書かずに使えるようにする機能。
React16.8(2019/2〜)で追加された。

ここでは基本の２つのフックを記載する。

### ■ useState
このフックによりクラスコンポーネントに頼らなくてもstateを持つことができる。

```tsx
import React, { useState } from 'react'
// いわゆるおまじない
```

```ts
const [count1, setCount1] = useState<number>(0)
// useStateフックの登場。二つの要素を持った配列を返します。
// count1    : 状態を保持する変数
// setCount1 : count1を更新する関数
// useStateには変数の初期値(0)を引数に渡す。
// TypeScriptで書いているので、型(number)を指定している。
```
```tsx
<p>[1] {count1} 回クリックしました</p>
// {count}には、stateで保存されているcountの値が表示されます。
// {count}の値が変わるたびにレンダリングされます。
```

```tsx
  const handleClick1 = () => {
    setCount1(count1 + 1 )
  }
  // ボタンがクリックされたときのコールバック関数
  // useStateフックから返ってきた状態更新関数(setCount1)で更新する。
  // setCount1を使わないと、count1の値を変更することができない。
```

```tsx
<button onClick={handleClick1}>C1</button>
// このボタンがクリックされるとhandClick1()が実行される
```

### ■ useEffect
このフックによりレンダリングの後に動作する処理を書くことができる。
デフォルトではレンダリングが行われる度に毎回動作しますが、第二引数に配列を与えることで、特定の値が変化した時のみ動作させるようにすることも可能。
クラスコンポーネントの`componentDidMount`, `componentDidUpdate`の処理に相当する。
返り値にはコンポーネントがアンマウントされる時や再レンダーによって副作用が再実行される時の処理を記載できる。

```tsx
import React, { useEffect } from 'react'
// いわゆるおまじない
// useStateと同時に使うなら、次のようにカンマで繋げる
// import React, { useState, useEffect } from 'react'
```

```tsx
  useEffect(
    () => {
      document.title =`useEffect（C1:${count1}) (C2:${count2}）`
    },
    [count1, count2]
  );
  // count1, count2のいずれかの値に変更があった場合に処理が走る。
```


## 3. クラスコンポーネントをReactHooksを使って関数コンポーネントにしてみよう

具体例としてクラスコンポーネントで書かれたコンポーネントをHooksを使って関数コンポーネントに書き換える。

### ■ Before:クラスコンポーネント(EffectCC.tsx)
```tsx
import React from  'react';
import Button from '@material-ui/core/Button';

interface IEffectCCState {
  count1:number;
  count2:number;
}

class EffectCC extends React.Component<{},IEffectCCState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      count1: 0,
      count2: 0,
    };
  }

  componentDidMount() {
    document.title =`Mount（C1:${this.state.count1}) (C2:${this.state.count2}）`
  }

  componentDidUpdate() {
    document.title =`Update（C1:${this.state.count1}) (C2:${this.state.count2}）`
  }

  handleClick1() {
    this.setState({ count1: this.state.count1 + 1 })
  }
  handleClick2() {
    this.setState({ count2: this.state.count2 + 1 })
  }

  render() {
    return (
      <div>
        <h1>クラスコンポーネント</h1>
        <p>[1] {this.state.count1} 回クリックしました。</p>
        <p>[2] {this.state.count2} 回クリックしました。</p>
        <Button variant="contained" color="primary" onClick={this.handleClick1.bind(this)}>C1</Button>
        <Button variant="contained" color="primary" onClick={this.handleClick2.bind(this)}>C2</Button>
      </div>
    );
  }
}

export default EffectCC
```

### ■ After:関数コンポーネント(EffectFC.tsx)
```tsx
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';

const EffectFC:React.FC = () => {

  const [count1, setCount1] = useState<number>(0)
  const handleClick1 = () => {
    setCount1(count1 + 1 )
  }

  const [count2, setCount2] = useState<number>(0)
  const handleClick2 = () => {
    setCount2(count2 + 1 )
  }

  useEffect(
    () => {
      document.title =`useEffect（C1:${count1}) (C2:${count2}）`
    },
    [count1, count2]
  );


  return(
    <div>
      <h1>関数コンポーネント</h1>
      <p>[1] {count1} 回クリックしました</p>
      <p>[2] {count2} 回クリックしました</p>
      <Button variant="contained" color="primary" onClick={handleClick1}>C1</Button>
      <Button variant="contained" color="primary" onClick={handleClick2}>C2</Button>
    </div>
  );
}

export default EffectFC
```



## 4. 参考サイト
### 「React公式ガイド」
https://ja.reactjs.org/

### 「Reactのライフサイクル – React入門」
https://www.to-r.net/media/react-tutorial09/

### 「React公式チュートリアルをTypeScriptでやる」
https://note.com/tkugimot/n/nf7fe751298b1
