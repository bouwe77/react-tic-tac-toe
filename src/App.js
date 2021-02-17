import { useEffect, useState } from "react";
import "./styles.css";

const X = "X";
const O = "O";

function determineWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  let winner = false;
  for (const combination of winningCombinations) {
    const [x, y, z] = combination;
    winner =
      squares[x] !== null &&
      squares[x] === squares[y] &&
      squares[x] === squares[z];
    if (winner) return squares[x];
  }

  return null;
}

const getEmptySquares = () => new Array(9).fill(null);
const initialTurn = X;

export default function App() {
  const [squares, setSquares] = useState(getEmptySquares);
  const [turn, setTurn] = useState(initialTurn);
  const [winner, setWinner] = useState(null);

  const gameOver = squares.findIndex((t) => t === null) < 0;

  useEffect(() => {
    const winner = determineWinner(squares);
    if (winner) setWinner(winner);
  }, [squares]);

  function handleClick(index) {
    const newThings = [...squares];
    newThings[index] = turn;
    setSquares(newThings);
    setTurn(turn === X ? O : X);
  }

  function tryAgain() {
    setSquares(getEmptySquares());
    setTurn(initialTurn);
    setWinner(null);
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {gameOver && !winner && <h1>GAME OVER !!!</h1>}
      {winner && <h1>{`Player ${winner} WON`}</h1>}
      {(gameOver || winner) && (
        <div>
          <button onClick={tryAgain}>Try Again</button>
        </div>
      )}

      {squares.map((t, index) => (
        <span key={index}>
          <Square
            mode={t}
            onClick={() => handleClick(index)}
            disabled={gameOver || winner || t !== null}
          />
          {(index + 1) % 3 === 0 && <br />}
        </span>
      ))}
    </>
  );
}

function Square({ mode, ...rest }) {
  return (
    <button style={{ margin: "5px", width: "50px", height: "50px" }} {...rest}>
      {mode}
    </button>
  );
}
