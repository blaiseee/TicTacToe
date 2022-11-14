import React from "react";
import "./index.css";
import { SquareComponent } from "./Square";


export const BoardComponent = (props) => {
  const renderSquare = (i) => {
    return (
      <SquareComponent
        isWinning={props.winningSquares.includes(i)}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const renderSquares = (i) => {
    let squares = [];
    for (i; i < props.squares.length; i++) {
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
