import React from "react";
import "./index.css";

export const SquareComponent = (props) => {
  return (
    <button
      className={"square " + (props.isWinning ? "square--winning" : null)}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};