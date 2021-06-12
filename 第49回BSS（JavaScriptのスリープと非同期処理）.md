# 第49回BSS（JavaScriptのスリープと非同期処理）

日時　：2021年 6月9日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***
* Reactの関数コンポーネントが再リレンダリングする条件を知る
* JavaScriptの非同期処理をマスターする
  
***目次***
- [第49回BSS（JavaScriptのスリープと非同期処理）](#第49回bssjavascriptのスリープと非同期処理)
  - [1. Reactでの再レンダリング](#1-reactでの再レンダリング)
    - [1.1 Reactコンポーネントの再レンダリング条件](#11-reactコンポーネントの再レンダリング条件)
    - [1.2 React.memo / useCallback / useMemo の使い方](#12-reactmemo--usecallback--usememo-の使い方)
    - [1.3 参考サイト](#13-参考サイト)
  - [2. JavaScriptのSleepと非同期処理](#2-javascriptのsleepと非同期処理)
    - [2.1 JavaScriptのSleep関数を実装する](#21-javascriptのsleep関数を実装する)
    - [2.2 setTimeout()とコールバック地獄](#22-settimeoutとコールバック地獄)
    - [2.3 Promiseで解決](#23-promiseで解決)
    - [2.4 async/awaitでスッキリ](#24-asyncawaitでスッキリ)
    - [2.5 (おまけ)Promis.allで並列処理](#25-おまけpromisallで並列処理)
    - [2.6 Sleep処理を作成](#26-sleep処理を作成)
    - [2.7 参考サイト](#27-参考サイト)


## 1. Reactでの再レンダリング

### 1.1 Reactコンポーネントの再レンダリング条件
Reactコンポーネントの再レンダリングはおおよそ以下3つの条件で発生します。（OR条件）
1. propsの更新
2. stateの更新
3. 親コンポーネントが再レンダリングされた時


### 1.2 React.memo / useCallback / useMemo の使い方
1. コールバックを受け取るコンポーネントは、「propsの更新」と「親コンポーネントの再レンダリング」という2つの要因によって、不要な再レンダリングが行われる(ことがある)
2. useCallbackを利用すると(不要な)「propsの更新」は抑制できるが、「親コンポーネントの再レンダリング」という要因は残るので、結局再レンダリングが起きてしまう。(この段階では「意味のないuseCallback」)
3. React.memo等を組み合わせることで、 「親コンポーネントのレンダリング」をトリガーとする不要なレンダリングも抑制できる
4. 2.と3.の合わせ技で、全体として不要なレンダリングを無くすことができる。(こうなって初めて「意味のあるuseCallback」に！)


### 1.3 参考サイト
- [意味のない useCallback とその理由と解消法](https://qiita.com/jonakp/items/0db6fb9e75edcec875b2)
- [React の Context の更新による不要な再レンダリングを防ぐ 〜useContext を利用した時に発生する不要な再レンダリングを防ぐ方法に関して〜](https://qiita.com/soarflat/items/b154adc768bb2d71af21)


## 2. JavaScriptのSleepと非同期処理

### 2.1 JavaScriptのSleep関数を実装する

JavaScriptでのスリープは以下で実現できる。

```js
await new Promise(resolve => setTimeout(resolve, 3000));
```

```js
// 関数化するなら
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await sleep(3000);
await sleep(2000);
```

※async宣言した関数で使用可能


使用例
```js
const func = async (data) => {

    await new Promise(resolve => setTimeout(resolve, 2000));
    data = data + 10;
    console.log("1: " + data.toString());

    await new Promise(resolve => setTimeout(resolve, 1000));
    data = data + 100;
    console.log("2: " + data.toString());
}
func(100);

```



### 2.2 setTimeout()とコールバック地獄

■ Sleep目的での間違ったsetTimeout()の使い方

```js
const func = (data) => {
    setTimeout(() => {
        data = data + 10;
        console.log("1: " + data.toString());
    }, 2000);

    setTimeout(() => {
        data = data + 100;
        console.log("2: " + data.toString());
    }, 1000);
};
func(100);
```
※ ２が先に動いてしまう。並列実行が目的ならOK

■ Sleep目的での正しい使い方
```js
const func = (data) => {
    setTimeout(() => {
        data = data + 10;
        console.log("1: " + data.toString());

        setTimeout(() => {
            data = data + 100;
            console.log("2: " + data.toString());
        }, 1000);
    }, 2000);

};
func(100);
```


■ コールバック地獄
```js
const func = (data) => {
    setTimeout(() => {
        data = data + 10;
        console.log("1: " + data.toString());
        setTimeout(() => {
            data = data + 100;
            console.log("2: " + data.toString());
            setTimeout(() => {
                data = data + 100;
                console.log("3: " + data.toString());
                setTimeout(() => {
                    data = data + 100;
                    console.log("4: " + data.toString());
                    setTimeout(() => {
                        data = data + 100;
                        console.log("5: " + data.toString());
                        setTimeout(() => {
                            data = data + 100;
                            console.log("6: " + data.toString());
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 2000);
};
func(100);
```



### 2.3 Promiseで解決
```js
const func = (data) => {
    new Promise((resolve) => {
        setTimeout(() => {
            data = data + 10;
            console.log("1: " + data.toString());
            resolve(data);
        }, 2000);
    }).then((data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                data = data + 100;
                console.log("2: " + data.toString());
                resolve(data);
            }, 1000)
        });
    }).then((data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                data = data + 100;
                console.log("3: " + data.toString());
            }, 1000);
        });
    });

};
func(100);
```


### 2.4 async/awaitでスッキリ
```js
const func = async (data) => {

    p = await new Promise((resolve) => {
            setTimeout(() => {
                data = data + 10;
                resolve(data);
            }, 2000);
        });
    console.log("1: " + p.toString());

    p = await new Promise((resolve) => {
            setTimeout(() => {
                data = data + 100;
                resolve(data);
            }, 1000);
        });
    console.log("2: " + p.toString());

    p = await new Promise((resolve) => {
            setTimeout(() => {
                data = data + 100;
                resolve(data);
            }, 1000);
        });
    console.log("3: " + p.toString());

};
func(100);
```


### 2.5 (おまけ)Promis.allで並列処理
```js
const func = async (data) => {

    console.log("p1 start.");
    p1 = new Promise((resolve) => {
            setTimeout(() => {
                val = data + 100;
                console.log("p1: " + val);
                resolve(val);
            }, 2000);
        });

    console.log("p2 start.");
    p2 = new Promise((resolve) => {
            setTimeout(() => {
                val = data * 100;
                console.log("p2: " + val);
                resolve(val);
            }, 1000);
        });

    console.log("p3 start.");
    p3 = new Promise((resolve) => {
            setTimeout(() => {
                val = data / 100;
                console.log("p3: " + val);
                resolve(val);
            }, 1500);
        });

    const result = await Promise.all([p1, p2, p3]);
    console.log("p1:" + result[0] + " / p2:" + result[1] + " / p3:" +
result[2]);
};
func(100);
```


### 2.6 Sleep処理を作成

ここまでを踏まえてSleep処理を簡略化

```js
// よくある長めの実装
const sleep = () => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 3000)
})
await sleep()

// ステップ1: () => { resolve() } のラップを外して resolve にする
const sleep = () => new Promise(resolve => {
  setTimeout(resolve, 3000)
})
await sleep()

// ステップ2: 1行なので{}を外す
const sleep = () => new Promise(resolve => setTimeout(resolve, 3000))
await sleep()

// ステップ3: 完成
await new Promise(resolve => setTimeout(resolve, 3000))

// ステップ2からスリープ時間を引数に関数化
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
await sleep(3000)
```

### 2.7 参考サイト
- [awaitできるsetTimeoutを1行で書く方法](https://qiita.com/suin/items/99aa8641d06b5f819656)
