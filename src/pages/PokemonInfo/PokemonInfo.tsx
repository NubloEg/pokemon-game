import React, { useEffect, useState } from "react";
import About from "./State/About/About.tsx";
import Status from "./State/Status/Status.tsx";
import Evolutions from "./State/Evolutions.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData.ts";
import { Pokedex } from "../../api/aboutPokemonData.ts";
import TypePokemon from "../../components/Type/Type.tsx";
import s from "./PokemonInfo.module.css";
import { useSelector } from "react-redux";
import { selectCurrentPokemon } from "../../redux/pokemonSlice.ts";
import Loading from "../../components/Loading/Loading.tsx";

export default function PokemonInfo() {
  const [nowPokemon, setNowPokemon] = useState<Pokemon | undefined>();
  const [about, setAbout] = useState<Pokedex | undefined>(undefined);

  let currentPokemonId = useSelector(selectCurrentPokemon);

  const ssesionId = sessionStorage.getItem("currentPokemon");
  if (ssesionId !== null) {
    currentPokemonId = parseInt(ssesionId, 10);
  }

  const getInfoPokemon = (id: number | undefined) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNowPokemon(data);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  const getAboutPokemon = (id: number | undefined) => {
    fetch(`https://pokeapi.co/api/v2/characteristic/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAbout(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getInfoPokemon(currentPokemonId);
    getAboutPokemon(currentPokemonId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!nowPokemon ? (
        <Loading loading={!nowPokemon} />
      ) : (
        <>
          <div className={s.card}>
            <img
              className={s.pokemonImg}
              alt="pok"
              src={nowPokemon.sprites.other["official-artwork"].front_default}
            />
            <h2>{nowPokemon.name}</h2>
            <div className={s.types}>
              {nowPokemon.types?.map((type) => (
                <TypePokemon key={type.type.name} typeName={type.type.name} />
              ))}
            </div>
            <div className={s.Tabs}>
              <Link className={s.tab} to={`/pokemon/${nowPokemon.id}/about`}> About</Link>
              <Link className={s.tab} to={`/pokemon/${nowPokemon.id}/status`}> Status</Link>
              <Link className={s.tab} to={`/pokemon/${nowPokemon.id}/evolution`}>Evolutions</Link>
            </div>
            <div className={s.content}>
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
          </div>
        </>
      )}
    </>
  );
}
