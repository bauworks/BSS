import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// ========================================
// Square
// ========================================
interface ISquareProps {
    value: string;
    onClick: () => void
}
const Square:React.FC<ISquareProps> = (props) => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}


// ========================================
// Board
// ========================================
interface IBoardProps {
    squares: Array<string>;
    onClick: (i:number) => void
}
const Board:React.FC<IBoardProps> = (props) => {
  const renderSquare = (i:number) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
  

// ========================================
// Game
// ========================================
const Game:React.FC = () => {
  const [history, setHistory] = useState<Array<{squares: Array<string>}>>([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);


  const handleClick = (i:number) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(_history.concat([{squares: squares}]))
    setStepNumber(_history.length);
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step:number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }


  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i:number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


// ========================================
// Main
// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));


// ========================================
// Local Function
// ========================================
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