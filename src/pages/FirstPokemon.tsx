import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../api/pokemonData";

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
      {randomPokemon && (
        <div>
          <div>{randomPokemon.name}</div>
          {randomPokemon.id > -1 ? (
            <Link to={"/pokemon/about"}>
              <img
                height={"450px"}
                src={
                  randomPokemon.sprites.other?.["official-artwork"]
                    .front_default
                }
                alt=""
              />
            </Link>
          ) : (
            <img
              height={"450px"}
              src={
                randomPokemon.sprites.other?.["official-artwork"].front_default
              }
              alt=""
            />
          )}
        </div>
      )}
      <button hidden={!!randomPokemon} onClick={() => randomPokemonFun(1000)}>
        Random pokemon
      </button>
    </div>
  );
}
