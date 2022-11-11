import React from "react";
import SquareComponent from "./Square";
import "./index.css";

const BoardComponent = () => {
  return <div>{renderSquares(0)}</div>;
};

const renderSquare = (props, i) => {
  return (
    <SquareComponent
      isWinning={props.winningSquares.includes(i)}
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  );
};

function renderSquares(i) {
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
}

export default BoardComponent;
