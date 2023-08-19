import React, { useState } from "react";
import PokedexItem from "../../components/PokedexItem";

export default function Pokedex() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <div className="pokedexItems">
      {items.map((item) => (
        <PokedexItem pokemon={{ id: item }} key={item} />
      ))}
    </div>
  );
}
