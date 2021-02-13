import { useEffect, useState } from "react";
import "./styles.css";

const modes = {
  EMPTY: "-",
  X: "X",
  O: "O"
};

function determineWinner(tiles) {
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
      tiles[x] !== modes.EMPTY &&
      tiles[x] === tiles[y] &&
      tiles[x] === tiles[z];
    if (winner) return tiles[x];
  }

  return null;
}

const getEmptyTiles = () => new Array(9).fill(modes.EMPTY);
const initialTurn = modes.X;

export default function App() {
  const [tiles, setTiles] = useState(getEmptyTiles);
  const [turn, setTurn] = useState(initialTurn);
  const [winner, setWinner] = useState(null);

  const gameOver = tiles.findIndex((t) => t === modes.EMPTY) < 0;

  useEffect(() => {
    const winner = determineWinner(tiles);
    if (winner) setWinner(winner);
  }, [tiles]);

  function handleClick(index) {
    const newThings = [...tiles];
    newThings[index] = turn;
    setTiles(newThings);
    setTurn(turn === modes.X ? modes.O : modes.X);
  }

  function tryAgain() {
    setTiles(getEmptyTiles());
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

      {tiles.map((t, index) => (
        <span key={index}>
          <Tile
            mode={t}
            onClick={() => handleClick(index)}
            disabled={gameOver || winner || t !== modes.EMPTY}
          />
          {(index + 1) % 3 === 0 && <br />}
        </span>
      ))}
    </>
  );
}

function Tile({ mode, ...rest }) {
  return (
    <button style={{ margin: "5px", width: "50px", height: "50px" }} {...rest}>
      {mode}
    </button>
  );
}
