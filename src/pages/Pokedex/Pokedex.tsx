import React, { useEffect, useState } from "react";
import PokedexItem from "../../components/PokedexItem/PokedexItem";
import s from "./Pokedex.module.css";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";

export default function Pokedex() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${36 * page}&limit=36`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.results);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <input type="search" />
      <Select options={["fire", "grass", "flying"]}>type</Select>
      <Select options={["common", "rare", "mythikal", "legendary"]}>
        rare
      </Select>
      <div>
        <Button
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
        >
          Назад
        </Button>
        <h3>{page+1}</h3>
        <Button onClick={() => setPage(page + 1)}>Вперед</Button>
      </div>
      <div className={s.pokedexItems}>
        {items &&
          items?.map((item: { url: string }) => (
            <PokedexItem url={item.url} key={item.url} />
          ))}
      </div>
    </div>
  );
}
