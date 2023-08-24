import React, { useEffect, useState } from "react";
import PokedexItem from "../../components/PokedexItem/PokedexItem";
import s from "./Pokedex.module.css";
import Select from "../../components/Select/Select";

export default function Pokedex() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=15}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.results);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <input type="search" />
      <Select options={["fire","grass","flying"]}>type</Select>
      <Select options={["common","rare","mythikal","legendary"]}>rare</Select>
      <div className={s.pokedexItems}>
        {items &&
          items?.map((item: { url: string }) => (
            <PokedexItem url={item.url} key={item.url} />
          ))}
      </div>
    </div>
  );
}
