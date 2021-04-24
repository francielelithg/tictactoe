import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

const selectedStyle = {
  color: "black"
};

const Board = () => {
  const cleanBoard = Array(3)
    .fill()
    .map(() => Array(3).fill());
  const [matrix, setMatrix] = useState(cleanBoard);
  const [clickX, setClickX] = useState(true);
  const [winner, setWinner] = useState(null);
  const handleReset = (event) => {
    event.preventDefault();
    setClickX(true);
    setWinner(null);
    setMatrix(cleanBoard);
  };
  const handleClickSquare = (row, col) => {
    if (!matrix[row][col] && !winner) {
      matrix[row][col] = clickX ? "X" : "O";
      setClickX(!clickX);
      setMatrix(matrix);
      checkBoard();
    }
  };
  const checkBoard = () => {
    matrix.forEach((row, i) => {
      if (row.some((value) => value) && row[0] === row[1] && row[0] === row[2])
        setWinner(row[0]);
      if (i === 0) {
        row.forEach((col, j) => {
          if (col && col === matrix[1][j] && col === matrix[2][j])
            setWinner(col);
          if (j === 0 && col && col === matrix[1][1] && col === matrix[2][2])
            setWinner(col);
          if (j === 2 && col && col === matrix[1][1] && col === matrix[2][0])
            setWinner(col);
        });
      }
    });
  };
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{clickX ? "X" : "O"}</span>
      </div>
      {winner && (
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          Winner: <span>{winner}</span>
        </div>
      )}
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {matrix &&
          matrix.map((row, index) => (
            <div className="board-row" style={rowStyle} key={index}>
              {row.map((column, i) => (
                <div key={i} onClick={() => handleClickSquare(index, i)}>
                  <div className="square" style={squareStyle}>
                    <div style={selectedStyle}>{column}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
