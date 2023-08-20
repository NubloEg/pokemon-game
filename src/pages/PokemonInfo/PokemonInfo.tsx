import React, { useEffect, useState } from "react";
import About from "../../components/About.tsx";
import Status from "../../components/Status.tsx";
import Evolutions from "../../components/Evolutions.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData.ts";
import { Pokedex } from "../../api/aboutPokemonData.ts";
import TypePokemon from "../../components/Type/Type.tsx";
import s from "./PokemonInfo.module.css"

export default function PokemonInfo() {
  const [nowPokemon, setNowPokemon] = useState<Pokemon | undefined>();
  const [about, setAbout] = useState<Pokedex | undefined>(undefined);

  const getInfoPokemon = (id: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNowPokemon(data);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  const getAboutPokemon = (id: number) => {
    fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setAbout(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /*   */

  useEffect(() => {
    getInfoPokemon(887);
    getAboutPokemon(887);
  }, []);

  return (
    <>
      {!nowPokemon ? (
        <span>Loading</span>
      ) : (
        <>
          <div className="card">
            <img
              alt="pok"
              src={nowPokemon.sprites.other["official-artwork"].front_default}
            />
            <h2>{nowPokemon.name}</h2>
            <div className={s.types}>
              {nowPokemon.types?.map((type) => (
                <TypePokemon key={type.type.name} typeName={type.type.name} />
              ))}
            </div>
            <div className="Tabs">
              <Link to={"/pokemon/about"}> About</Link>
              <Link to={"/pokemon/status"}> Status</Link>
              <Link to={"/pokemon/evolution"}> Evolutions</Link>
            </div>
            <Routes>
              <Route
                path="/about"
                element={
                  <About
                    about={
                      about === undefined
                        ? "none"
                        : about.descriptions[7].description
                    }
                    stats={nowPokemon.stats}
                  />
                }
              />
              <Route path="/status" element={<Status />} />
              <Route path="/evolution" element={<Evolutions />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}
