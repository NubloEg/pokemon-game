import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../api/pokemonData";

export default function FirstPokemon() {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon>({
    name: "Hz",
    id: 0,
    sprites: {
      front_default:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
      other: {
        "official-artwork": {
          front_default:
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
          front_shiny:
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
        },
      },
    },
    weight: 32,
  });
  function getRandomArbitrary(min, max) {
    let result = Math.random() * (max - min) + min;
    console.log(result)
    return Math.floor(result);
  }

  const randomPokemonFun = (id: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomArbitrary(1, id)}`)
      .then((response) => response.json())
      .then((data) => {
        setRandomPokemon(data);
        console.log(data);
      });
  };

  return (
    <div>
      <Link to={"/pokemon"}>Pokemon</Link>
      <button onClick={() => randomPokemonFun(1000)}>Random</button>
      <div>{randomPokemon.name}</div>
      <img
        src={randomPokemon.sprites.other?.["official-artwork"].front_default}
        alt=""
      />
    </div>
  );
}
