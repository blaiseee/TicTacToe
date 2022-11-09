import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

let isDraw = false;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    const renderSquares = [];

    for (let i = 0; i < this.props.squares.length; i++) {
      if (i % 3 == 0) {
        renderSquares.push(
          <div className="board-row" key={i}>
            {this.renderSquare(i)}
            {this.renderSquare(i + 1)}
            {this.renderSquare(i + 2)}
          </div>
        );
      }
    }

    return <div>{renderSquares}</div>;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    // for (let a = 0; a < current.squares.length; a++) {
    //   if (isNotNull(current.squares))
    //     console.log("draw");
    // }
    // console.log(isNull(current.squares));

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    // for (let a = 0; a < current.squares.length; a++) {
    //   if (isNotNull(current.squares)) {
    //     status = "Draw";
    //     console.log("draw");
    //     // return;
    //   }

    if (!isDraw)
    {
      status = winner
        ? "Winner: " + winner
        : "Next player: " + (this.state.xIsNext ? "X" : "0");
    }

    else
      status = "Draw";

    // if (winner) status = "Winner: " + winner;
    // else if (!winner)
    //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // else if (this.isDraw)
    //   status = "Draw";
    // }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
}

function isNotNull(arr) {
  return arr.every((element) => element !== null);
}

function calculateWinner(squares) {
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

  // for (let x = 0; x < lines.length; x++) {
  //   // if (isNotNull(squares)) {
  //   //   console.log("draw");
  //   //   this.isDraw = true;
  //   // }
  //   const [a, b, c] = lines[x];
  //   // console.log(squares);
  //   if (isNotNull(squares))
  //     console.log("draw");
  // }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];

    else if (isNotNull(squares)) {
      isDraw = true;
      return null;
    }
  }

  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
