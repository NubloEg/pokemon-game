import React, { useEffect, useState } from "react";
import PokedexItem from "../../components/PokedexItem/PokedexItem";
import s from "./Pokedex.module.css";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";

export default function Pokedex() {
  const [items, setItems] = useState<Array<{ url: string }>>([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("All");

  useEffect(() => {
    if (searchType === "All") {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchValue}?offset=${
          36 * page
        }&limit=36`
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data.results);
        })
        .catch((e) => {
          alert("Покемон не найден");
        });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchValue, searchType]);

  useEffect(() => {
    if (searchType !== "All") {
      setSearchType(searchType.toLowerCase());
      fetch(
        `https://pokeapi.co/api/v2/type/${searchType}?offset=${
          36 * page
        }&limit=36`
      )
        .then((response) => response.json())
        .then((data) => {
          setItems([]);
          const items: Array<{ url: string }> = [];
          for (let i = 36 * page; i < 36 * (page + 1); i++) {
            const element = data.pokemon[i].pokemon;
            if (element === undefined) {
              break;
            }
            items.push(element);
          }

          setItems(items);
        })
        .catch((e) => {});
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchType]);

  return (
    <div className={s.containerPokedex}>
      <div className={s.topMenu}>
        <div className={s.searchMenu}>
         {/*  <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          /> */}
          <Select
            setSearchType={setSearchType}
            options={["All", "Fire", "Grass", "Flying"]}
          />
        </div>
        <div className={s.changePage}>
          <Button
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
              }
            }}
          >
            Назад
          </Button>
          <h3>{page + 1}</h3>
          <Button onClick={() => setPage(page + 1)}>Вперед</Button>
        </div>
      </div>
      <div style={{ height: "80%", overflow: "auto" }}>
        <div className={s.pokedexItems}>
          {items &&
            items?.map((item: { url: string }) => (
              <PokedexItem url={item.url} key={item.url} />
            ))}
        </div>
      </div>
    </div>
  );
}
