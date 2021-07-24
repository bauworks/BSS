# 第52回BSS（React+TypeScriptでテトリス）

日時　：2021年 7月14日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***
* 「React + TypeScript」でテトリスを作ってみた
* 実現するための要所をピックアップ
  
***目次***
- [第52回BSS（React+TypeScriptでテトリス）](#第52回bssreacttypescriptでテトリス)
  - [環境](#環境)
  - [1. テトリスAPPを動かす](#1-テトリスappを動かす)
  - [2. テトリスを実現するための要所](#2-テトリスを実現するための要所)
    - [2.1 タイルの敷き詰め](#21-タイルの敷き詰め)
    - [2.2 ブロックの表現](#22-ブロックの表現)
    - [2.3 タイマーイベント処理](#23-タイマーイベント処理)
    - [2.4 キーイベント処理](#24-キーイベント処理)
    - [2.5 ブロックの移動や回転の可不可判定](#25-ブロックの移動や回転の可不可判定)
    - [2.6 ブロックのセット](#26-ブロックのセット)
    - [2.7 一列揃ったラインの削除](#27-一列揃ったラインの削除)
  - [3. 参考サイト](#3-参考サイト)


## 環境
- macOS Big Sur 11.4
- VSCode 1.59.0
- Docker 20.10.7
- Docker Compose 1.29.2


## 1. テトリスAPPを動かす

■ コンテナの作成と実行環境の整備
```sh
$ cd react-tetris
$ docker-compose up -d
$ docker exec -it tetris /bin/sh
# cd reactapp
# yarn install
(時間がかかる)
# yarn start
```

■ ブラウザで `http://localhost:3000/` にアクセス

![テトリスAPP](https://user-images.githubusercontent.com/19363285/126862900-813a229b-52e6-4327-b5d1-926b7c22ff65.png)


■ `docker-compose.yaml` を以下のように編集すると次回以降は自動起動します。
```
    # <<yarn install 実施後>>
    command: sh -c "cd reactapp && yarn start"
```
（commandをコメントアウト）

## 2. テトリスを実現するための要所

### 2.1 タイルの敷き詰め
- 正方形のDIV（タイル）を敷き詰めてゲームボードを表現する。
- 敷き詰めたDIVに色を付け、その組み合わせでブロックを表現する

■ タイルは styled-components で実現。描画時の引数で色付けする。
```ts
interface Props {
  bgcolor: string
}
export const Tile = styled.div<Props>`
  width: 20px;
  height: 20px;
  border-width: 2px;
  background-color: ${(props:Props) => {return props.bgcolor}};
  border-style:outset;
  box-sizing: border-box;
  display: table-cell;
`
```

■ `display: "table"` でタイルを隙間なく敷き詰める
```ts
const tileBoardStyle: React.CSSProperties = {
    display: "table"
};

// JSX
return (
    <div style={tileBoardStyle}>
    {tilesAll}
    </div>
)
```

■ タイルの敷き詰め（行）
```ts
const tilesAll = tilesInfo.map((rowInfo, index) => 
    <div key={index}>
    {tilesRow(rowInfo)}
    </div>
);
```

■ タイルの敷き詰め（列）
```ts
const tilesRow = (rowInfo: number[]) => (rowInfo.map((info, index) => 
    <Tile bgcolor={toColor(info)} key={index}/>
));
```


### 2.2 ブロックの表現
[こちらのサイト](https://qiita.com/MikihiroSaito/items/1796296ceb7b3e17d705)からそのまま使わせていただきました。

4次元配列の構成は
1. ブロックの種類
2. 回転（0℃，90℃, 180℃, 270℃）
3. ブロックを構成するタイル（1〜4）
4. 基準座標からのX,Y位置

```ts
const blockPatterns: number[][][][] = [
  [
    // The default square
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0]]
  ],

    ::  ::  ::

  [
    // The inverse Z tile
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]],
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]]
  ]
]
```


### 2.3 タイマーイベント処理

`useEffect` を使って初回のみ `window.setInterval` で0.5秒毎にイベントを発行します。
```ts
useEffect(() => {
    const timerId = window.setInterval(downBlock, 500);
    setTimerId(timerId);
    return () => clearInterval(timerId);
}, []);
```

タイマーで呼び出される処理は「↓」キーイベントと同一の処理です。
```ts
const downBlock = () => {
    setNextPos((xy: number[]) => [xy[0], xy[1]+1]);
};
```


### 2.4 キーイベント処理

KeyDownイベントリスナーを登録
```ts
useEffect(() => {
    document.addEventListener("keydown", keyDown, false);
}, []);
```

押されたキーコードに対応して基準座標や角度をずらします
```ts
const keyDown = useCallback((event: { keyCode: number; }) => {
    if (event.keyCode === 32) {         // Space
        setNextRotate((angle: number) => angle === 3 ? 0 : angle + 1);
    }

    ::  ::  ::

    else if (event.keyCode === 37) {    // Left
        setNextPos((xy: number[]) => [xy[0]-1, xy[1]]);
    }
    else if (event.keyCode === 39) {    // Right
        setNextPos((xy: number[]) => [xy[0]+1, xy[1]]);
    }
    else if (event.keyCode === 40) {    // Down
        setNextPos((xy: number[]) => [xy[0], xy[1]+1]);
    }
}, []);
```

### 2.5 ブロックの移動や回転の可不可判定
ここでは掲載しないが、移動前のブロックを白(0)に戻してから下記処理で判定する。
基準座標から配置されるタイルがボードをはみ出たり、すでにブロックが置いてある場合は設置不可と判定

```ts
type putBlockProps = {
  x: number;
  y: number;
  block: number;
  rotate: number;
}

const checkPutBlock = (
    props: putBlockProps,
    allTiles:　number[][]) :boolean => {

    const x = props.x;
    const y = props.y;
    const block = props.block;
    const rotate = props.rotate;

    if (
        // ボードを上下にはみ出すタイルがあるか？（配列の上下限に達しないか？）
        y + blockPatterns[block][rotate][0][1] > allTiles.length -1 ||
        y + blockPatterns[block][rotate][1][1] > allTiles.length -1 ||
        y + blockPatterns[block][rotate][2][1] > allTiles.length -1 ||
        y + blockPatterns[block][rotate][3][1] > allTiles.length -1 ||
        y + blockPatterns[block][rotate][0][1] < 0 ||
        y + blockPatterns[block][rotate][1][1] < 0 ||
        y + blockPatterns[block][rotate][2][1] < 0 ||
        y + blockPatterns[block][rotate][3][1] < 0 ||
        // ボードを左右にはみ出すタイルがあるか？（配列の上下限に達しないか？）
        x + blockPatterns[block][rotate][0][0] > allTiles[0].length -1 ||
        x + blockPatterns[block][rotate][1][0] > allTiles[0].length -1 ||
        x + blockPatterns[block][rotate][2][0] > allTiles[0].length -1 ||
        x + blockPatterns[block][rotate][3][0] > allTiles[0].length -1 ||
        x + blockPatterns[block][rotate][0][0] < 0 ||
        x + blockPatterns[block][rotate][1][0] < 0 ||
        x + blockPatterns[block][rotate][2][0] < 0 ||
        x + blockPatterns[block][rotate][3][0] < 0 ||
        // ブロックのセット予定の位置にすでに色付き(≠0)のタイルがあるか？
        allTiles[ y + blockPatterns[block][rotate][0][1] ][ x + blockPatterns[block][rotate][0][0] ] !== 0 ||
        allTiles[ y + blockPatterns[block][rotate][1][1] ][ x + blockPatterns[block][rotate][1][0] ] !== 0 ||
        allTiles[ y + blockPatterns[block][rotate][2][1] ][ x + blockPatterns[block][rotate][2][0] ] !== 0 ||
        allTiles[ y + blockPatterns[block][rotate][3][1] ][ x + blockPatterns[block][rotate][3][0] ] !== 0 ){
        return false;
    }
    return true;
}
```

### 2.6 ブロックのセット
ブロックにはブロックの種類に対応したカラー番号が渡される。
```ts
allTiles[ y + blockPatterns[block][rotate][0][1] ][ x + blockPatterns[block][rotate][0][0] ] = block;
allTiles[ y + blockPatterns[block][rotate][1][1] ][ x + blockPatterns[block][rotate][1][0] ] = block;
allTiles[ y + blockPatterns[block][rotate][2][1] ][ x + blockPatterns[block][rotate][2][0] ] = block;
allTiles[ y + blockPatterns[block][rotate][3][1] ][ x + blockPatterns[block][rotate][3][0] ] = block;
```

### 2.7 一列揃ったラインの削除
```ts
// １列揃った行があればその列を削除する
newTilesInfo = newTilesInfo.filter((rowInfo: number[]) => {
    return !(rowInfo.every((info)=>info !== 0))
});

// 削除されて不足した列を挿入
for (let rows = newTilesInfo.length; rows < tilesInfo.length; rows++) {
    const infos: number[] = new Array<number>(props.width).fill(0);
    newTilesInfo.unshift(infos);
}
```

## 3. 参考サイト
- [TypescriptとReactでTetrisを実装して遊んでみた](https://qiita.com/MikihiroSaito/items/1796296ceb7b3e17d705)

