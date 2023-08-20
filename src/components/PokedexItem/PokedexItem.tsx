import React from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData";
import s from "./PokedexItem.module.css"

interface Props {
  pokemon?: Pokemon;
}

export default function PokedexItem({ pokemon }: Props) {
  return (
    <>
      {pokemon ? (
        <Link className={s.card} to={`/pokemon/${pokemon.id}`}>
          <h2>{pokemon.name}</h2>
         <div>
         <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt="skeleton"
          />
         </div>
          <div className={s.types}>
            {pokemon.types?.map((type) => (
              <span>{type.type.name}</span>
            ))}
          </div>
        </Link>
      ) : (
        <div className={s.card}>
          <h2>Имя</h2>
         <div> <img src="" alt="skeleton" /></div>
          <div className={s.types}>
            <span>None</span>
          </div>
        </div>
      )}
    </>
  );
}
