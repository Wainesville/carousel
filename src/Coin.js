import React from "react";
import "./Coin.css";

function Coin({ side }) {
  return (
    <div>
      {side && <img src={side === "heads" ? "/path/to/heads.jpg" : "/path/to/tails.jpg"} alt={side} />}
    </div>
  );
}

export default Coin;
