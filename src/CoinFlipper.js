import React, { useState } from "react";
import Coin from "./Coin";

function CoinFlipper() {
  const [side, setSide] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  function flipCoin() {
    const isHeads = Math.random() > 0.5;
    if (isHeads) {
      setSide("heads");
      setHeadsCount(headsCount + 1);
    } else {
      setSide("tails");
      setTailsCount(tailsCount + 1);
    }
  }

  return (
    <div className="CoinFlipper">
      <h1>Let's flip a coin!</h1>
      <Coin side={side} />
      <button onClick={flipCoin}>Flip Coin</button>
      <p>Heads: {headsCount}, Tails: {tailsCount}</p>
    </div>
  );
}

export default CoinFlipper;
