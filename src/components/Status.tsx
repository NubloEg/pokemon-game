import React from "react";

export default function Status() {
  return (
    <div>
      <div className="stats">
        <div className="items">
          <div className="title">HP</div>
          <div className="value">35</div>
          <div className="progressBar">
            <div className="progressBarProc"></div>
          </div>
        </div>
        <div className="super status">
          Based on this pokemon's stats we consider tho best nature for
          Bulbasaur to have is Sassy. this will increase it's Sp. Def and
          decrease it's Speed stats.
        </div>
        <div className="Weaknesses">Weaknesses</div>
        <div className="Weaknesses_items">
          <div className="Weaknesse">
            <div className="icon"></div>
            <div className="title">Fire</div>
          </div>
        </div>
        <div>Type Defenses</div>
        <div>
          Based on this pokemon's stats we consider tho best nature for
          Bulbasaur to have is Sassy. this will increase it's Sp. Def and
          decrease it's Speed stats.
        </div>
      </div>
    </div>
  );
}
