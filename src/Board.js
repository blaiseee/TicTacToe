import React from "react";
import Square from "./Square";
import "./index.css";

const Board = (props) => {
  const renderSquare = (i) => {
    return (
      <Square
        isWinning={props.winningSquares.includes(i)}
        value={props.Square}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const renderSquares = (i) => {
    let squares = [];
    for (i; i < i + 3; i++) {
      if (i % 3 === 0) {
        squares.push(
          <div className="board-row" key={i}>
            {renderSquare(i)}
            {renderSquare(i + 1)}
            {renderSquare(i + 2)}
          </div>
        );
      }
    }
    return squares;
  };

  return <div>{renderSquares(0)}</div>;
};

export default Board;
