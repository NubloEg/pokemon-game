import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData";
import logo from "../../assets/images/randomBox.svg";
import Button from "../../components/Button/Button";
import s from "./FirstPokemon.module.css"

export default function FirstPokemon() {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  function getRandomArbitrary(min: number, max: number): number {
    let result = Math.random() * (max - min) + min;
    return Math.floor(result);
  }

  const randomPokemonFun = (id: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomArbitrary(1, id)}`)
      .then((response) => response.json())
      .then((data) => {
        setRandomPokemon(data);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  return (
    <div className={s.mainBox}>
      {randomPokemon ? (
        <div>
          <h1>Congratulations</h1>
          <Link to={"/pokemon/about"}>
            <img
              height={"270px"}
              src={
                randomPokemon.sprites.other?.["official-artwork"].front_default
              }
              alt=""
            />
          </Link>
        </div>
      ) : (
        <div>
          <img height={"180px"} src={logo} alt="" />
        </div>
      )}
      <Button hidden={!!randomPokemon} onClick={() => randomPokemonFun(1000)}>
        Click to random pokemon!!
      </Button>
    </div>
  );
}
