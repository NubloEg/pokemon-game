import React, { useState } from "react";
import PokedexItem from "../../components/PokedexItem/PokedexItem";
import s from "./Pokedex.module.css"

export default function Pokedex() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
  return (
   <>
   <div>
    <input type="search"/>
    <button>types</button>
    <button>rare</button>
   </div>
    <div className={s.pokedexItems}>
      {items.map((item) => (
        <PokedexItem  key={item} />
      ))}
    </div></>
  );
}
