import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BoardComponent } from "./Board";

const GameComponent = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDescending, setIsDescending] = useState(true);
  const [version, setVersion] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const current = version[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;

  const moves = version.map((step, move) => {
    const desc = move
      ? "Go to move #" + move + " @ " + version[move].location
      : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move === stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  if (winner)
    status = "Winner is Player " + winner.player + " @ " + winner.line;
  else if (!current.squares.includes(null)) status = "Draw";
  else status = "Next player: " + (xIsNext ? "X" : "O");

  // const history = this.state.history;

  const handleClick = (i) => {
    const locations = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ];

    const history = version.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setVersion(
      history.concat([
        {
          squares: squares,
          location: locations[i],
        },
      ])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const sortHistory = () => {
    setIsDescending(!isDescending);
  };

  return (
    <div className="game">
      <div className="game-board">
        <BoardComponent
          winningSquares={winner ? winner.line : []}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{isDescending ? moves : moves.reverse()}</ol>
        <button onClick={() => sortHistory()}>
          Sort by: {isDescending ? "Descending" : "Ascending"}
        </button>
      </div>
    </div>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GameComponent />);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return { player: squares[a], line: [a, b, c] };
  }
  return null;
};
