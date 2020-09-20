# React公式チュートリアルをTypeScriptに対応させてみよう

日時　：2020年9月16日(水)  
参加者：古川(発表者)・森・有川  

---

## 今回の趣旨
Dockerコンテナの新規作成してReact＆TypeScriptの開発環境を構築。
その開発環境でReactの公式チュートリアルをTypeScriptに対応させて動かす。

## 目次
1. [Dockerコンテナを新規構築](#1-Dockerコンテナを新規構築)
2. [React&TypeScriptの開発環境を構築](#2-React&TypeScriptの開発環境を構築)

3. [ReactチュートリアルをTypeScript開発環境で動かす](#3-ReactチュートリアルをTypeScript開発環境で動かす)
4. [参考サイト](#4-参考サイト)


## 環境
- macOS Catalina 10.15.6
- VSCode 1.49.0
- Docker 19.03.12
- Docker Compose 1.27.2

---
## 1. Dockerコンテナを新規構築
DockerでNode.jsの動作環境を構築する。


### ■ ディレクトリ構成
```
react-tutorial-ts/
├── docker-compose.yaml
├── dockerfile
└── project/        ← 作業ディレクトリ
    :
```

### ■ dockerfile

Node.js公式のイメージからDockerイメージを作成する。
```docker
FROM node:12.18.3-alpine3.12
ARG workdir=/project
WORKDIR $workdir
ENV TZ Asia/Tokyo
```

### ■ docker-compose.yml
Dockerコンテナの情報を記載する。
```yaml
version: "3.8"
services:
    tutorial:
        container_name: tutorial
        build:
            context: .
            dockerfile: dockerfile
        volumes:
            - ./project:/project
        tty: true
        ports:
          - 3000:3000
```

※ 上記環境はdocker-compose.yamlのみで作成可能だが、今回はDockerfileも作成した。
#### << dockerfileとdocker-compose.yamlの役割分担 >>
dockerfile : コンテナ内の情報を定義<br>
docker-compose.yaml : ホスト(Mac)から見たコンテナ情報を定義

### ■ コンテナをビルド＆起動
```
$ mkdir project
$ docker-compose up -d
```

## 2. React&TypeScriptの開発環境を構築

#### ■ React&TypeScript プロジェクトの作成
```
$ docker-compose exec tutorial sh
/project # yarn create react-app . --template typescript
/project # yarn start 
```

#### ■ DEMOアプリが動作することを確認
http://localhost:3000/ にアクセス
<img src="https://user-images.githubusercontent.com/19363285/91664679-c5a0eb00-eb2b-11ea-9416-7b6ac9453b60.png">



## 3. ReactチュートリアルをTypeScript開発環境で動かす

#### ■ DEMOアプリの削除（リネーム）
```
/project # mv src src.DEMO
/project # mkdir src
```

#### ■ Reactチュートリアルのソースコードを取得
以下のサイトから「CSS」と「JS」のソースコードをコピーして、それぞれindex.css, index.tsx というファイル名でsrcディレクトリ内に保存する。<br>
https://codepen.io/gaearon/pen/gWWZgR?editors=0010


<img src="https://user-images.githubusercontent.com/19363285/93711350-7ed16e80-fb88-11ea-88dc-64c57d8f90ce.png">

```
（<Ctrl-C>で yarn を停止）
^C
/project # mv src src.DEMO
/project # mkdir src
```

### ■ ディレクトリ構成
```
react-tutorial-ts/
└── project/
    └── src/
        ├─ index.css
        └─ index.tsx
```

#### << index.css >>
```css
body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
  }
  
  ol, ul {
    padding-left: 30px;
  }
  
  .board-row:after {
 
     :
```

#### << index.tsx >>
※ ファイルの先頭にimport文を以下のように追加すること。
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
     :
```

#### ■ エラーになることを確認

```
/project # yarn start
```

<img src="https://user-images.githubusercontent.com/19363285/93711751-bbeb3000-fb8b-11ea-9b56-ac92a3d3b2c7.png">


#### ■ index.tsx をTypeScriptに対応する
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


interface ISquareProps {
    value: string;
    onClick: () => void
}
function Square(props:ISquareProps) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
  
interface IBoardProps {
    squares: Array<string>;
    onClick: (i:number) => void
}
class Board extends React.Component<IBoardProps> {
    renderSquare(i:number) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  interface IGameProps {}

  interface IGameState {
    history: Array<{
        squares: Array<string>
    }>;
    onClick?: (i:number) => void;
    stepNumber: number;
    xIsNext: boolean
  }

  class Game extends React.Component<IGameProps, IGameState> {
    constructor(props:IGameProps) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }
  
    handleClick(i:number) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step:number) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares:Array<string>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

```


#### ■ Reactチュートリアルが動作することを確認
<img src="https://user-images.githubusercontent.com/19363285/93712013-8e9f8180-fb8d-11ea-82e2-65eb92c14c7f.png">


## 4. 参考サイト
### 「React公式チュートリアル」
https://ja.reactjs.org/tutorial/tutorial.html


### 「React公式チュートリアルをTypeScriptでやる」
https://note.com/tkugimot/n/nf7fe751298b1
