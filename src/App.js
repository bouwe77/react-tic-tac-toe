import { useState } from "react";
import "./styles.css";

const modes = {
  EMPTY: "S",
  X: "X",
  O: "O"
};

export default function App() {
  const [things, setThings] = useState(() => new Array(9).fill(modes.EMPTY));

  return (
    <div className="App">
      {things.map((t, index) => (
        <Button key={index} mode={t} />
      ))}
    </div>
  );
}

function Button({ mode }) {
  return (
    <button style={{ margin: "5px", width: "50px", height: "50px" }}>
      {mode}
    </button>
  );
}
