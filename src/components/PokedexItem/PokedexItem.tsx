import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData";
import s from "./PokedexItem.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPokemonId } from "../../redux/pokemonSlice";

interface Props {
  url: string;
}

export default function PokedexItem({ url }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const dispatch = useDispatch();

  const randomPokemonFun = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  useEffect(
    () => randomPokemonFun(),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      {pokemon ? (
        <Link
          onClick={() => dispatch(setCurrentPokemonId(pokemon.id))}
          className={s.card}
          to={`/pokemon/${pokemon.id}/about`}
        >
          <h3>{pokemon.name}</h3>
          <div>
            <img
              height={"120px"}
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
          <div>
            <img src="" alt="skeleton" />
          </div>
          <div className={s.types}>
            <span>None</span>
          </div>
        </div>
      )}
    </>
  );
}
