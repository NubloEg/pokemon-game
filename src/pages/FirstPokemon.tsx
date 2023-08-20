import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../api/pokemonData";
import logo from "./randomBox.svg";
import Button from "../components/Button/Button";

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
    <div>
      {randomPokemon ? (
        <div>
          <div>{randomPokemon.name}</div>
          <Link to={"/pokemon/about"}>
            <img
              height={"180px"}
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
