import React, * as react from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketMessage from "./SocketMessage";

const App: React.FC = () => {
  const [count, setCount] = react.useState<number>(0);

  const handleIncrement = react.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleDecrement = react.useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{count}</div>
        <button type="button" onClick={handleIncrement}>
          Add
        </button>
        <button type="button" onClick={handleDecrement}>
          Sub
        </button>
        <div>
          <SocketMessage />
        </div>
      </header>
    </div>
  );
};

export default App;
