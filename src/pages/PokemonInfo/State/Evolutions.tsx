import React, { useEffect } from "react";

export default function Evolutions(evolution: {
  first_evolv: string;
  seconde_evolve: string;
  three_evolve: string;
}) {

  return (
    <div>
      <div className="evolution">
        <img
          alt="ic"
          width={"178px"}
          src="https://upload.wikimedia.org/wikipedia/sh/thumb/4/43/Bulbasaur.png/1200px-Bulbasaur.png"
        />
        <div className="name">Ivysaur</div>
        <div className="info_evolution">
          Based on this pokemon's stats we consider tho best nature for
          Bulbasaur to have is Sassy. this will increase it's Sp. Def and
          decrease it's Speed stats.
        </div>
      </div>
    </div>
  );
}
