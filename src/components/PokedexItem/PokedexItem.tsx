import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData";
import s from "./PokedexItem.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPokemonId } from "../../redux/pokemonSlice";
import ContentLoader from "react-content-loader";

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

  const selectPokemon=(id:number)=>{
    dispatch(setCurrentPokemonId(id))
    sessionStorage.setItem("currentPokemon",id.toString());
  }

  return (
    <>
      {pokemon ? (
        <Link
          onClick={() => selectPokemon(pokemon.id)}
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
              <span key={pokemon.id}>{type.type.name}</span>
            ))}
          </div>
        </Link>
      ) : (
        <ContentLoader 
        speed={2}
        width={120}
        height={160}
        viewBox="0 0 120 160"
        backgroundColor="#8c8c8c"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="20" rx="100" ry="100" width="120" height="120" /> 
        <rect x="0" y="5" rx="0" ry="0" width="120" height="10" /> 
        <rect x="45" y="150" rx="0" ry="0" width="30" height="13" /> 
        <rect x="0" y="150" rx="0" ry="0" width="30" height="13" /> 
        <rect x="90" y="150" rx="0" ry="0" width="30" height="13" />
      </ContentLoader>
      )}
    </>
  );
}
