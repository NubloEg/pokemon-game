import React, { useEffect, useState } from "react";
import About from "./State/About/About.tsx";
import Status from "./State/Status/Status.tsx";
import Evolutions from "./State/Evolution/Evolutions.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData.ts";
import { Pokedex } from "../../api/aboutPokemonData.ts";
import TypePokemon from "../../components/Type/Type.tsx";
import s from "./PokemonInfo.module.css";
import { useSelector } from "react-redux";
import { selectCurrentPokemon } from "../../redux/pokemonSlice.ts";
import Loading from "../../components/Loading/Loading.tsx";
import { selectType } from "../../components/Type/Type.ts";

export default function PokemonInfo() {
  const [nowPokemon, setNowPokemon] = useState<Pokemon | undefined>();
  const [about, setAbout] = useState<Pokedex | undefined>(undefined);
  const [evolution, setEvolution] = useState<{
    first_evolv: string;
    seconde_evolve: string;
    three_evolve: string;
  }>({
    first_evolv: "",
    seconde_evolve: "",
    three_evolve: "",
  });
  const [pokemonInfoState, setPokemonInfoState] = useState<string>("about");

  let currentPokemonId = useSelector(selectCurrentPokemon);

  const ssesionId = sessionStorage.getItem("currentPokemon");
  if (ssesionId !== null) {
    currentPokemonId = parseInt(ssesionId, 10);
  }

  const getInfoPokemon = (id?: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNowPokemon(data);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  const getAboutPokemon = (id?: number) => {
    fetch(`https://pokeapi.co/api/v2/characteristic/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAbout(data);
      })
      .catch((e) => {});
  };

  const getEvolutionPokemon = (id?: number) => {
    fetch(` https://pokeapi.co/api/v2/evolution-chain/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.chain.species.url.at(-2));
        setEvolution({
          first_evolv: data.chain.species.url,
          seconde_evolve: data.chain.evolves_to[0].species.url,
          three_evolve: data.chain.evolves_to[0].evolves_to[0].species.url,
        });
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getInfoPokemon(currentPokemonId);
    getAboutPokemon(currentPokemonId);
    getEvolutionPokemon(currentPokemonId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <>
      {!nowPokemon ? (
        <Loading loading={!nowPokemon} />
      ) : (
        <>
          <div className={s.card}>
            <div
              className={s.img}
              style={{
                backgroundColor: selectType(
                  nowPokemon.types !== undefined
                    ? nowPokemon.types[0].type.name
                    : ""
                ).borderColor,
              }}
            >
              <img
                className={s.pokemonImg}
                style={{
                  backgroundColor: selectType(
                    nowPokemon.types !== undefined
                      ? nowPokemon.types[0].type.name
                      : ""
                  ).borderColor,
                }}
                alt="pok"
                src={nowPokemon.sprites.other["official-artwork"].front_default}
              />
            </div>
            <h2>{nowPokemon.name}</h2>
            <div className={s.types}>
              {nowPokemon.types?.map((type) => (
                <TypePokemon
                  key={type.type.name}
                  selectType={selectType}
                  typeName={type.type.name}
                />
              ))}
            </div>
            <div className={s.Tabs}>
              <Link
                className={`${s.tab} ${
                  pokemonInfoState === "about" && s.tabActive
                }`}
                to={`/pokemon/${nowPokemon.id}/about`}
                onClick={() => setPokemonInfoState("about")}
              >
                About
              </Link>
              <Link
                className={`${s.tab} ${
                  pokemonInfoState === "status" && s.tabActive
                }`}
                to={`/pokemon/${nowPokemon.id}/status`}
                onClick={() => setPokemonInfoState("status")}
              >
                Status
              </Link>
              <Link
                className={`${s.tab} ${
                  pokemonInfoState === "evolution" && s.tabActive
                }`}
                to={`/pokemon/${nowPokemon.id}/evolution`}
                onClick={() => setPokemonInfoState("evolution")}
              >
                Evolutions
              </Link>
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
                      weight={nowPokemon.weight}
                      height={nowPokemon.height}
                      ability={nowPokemon.abilities}
                      moves={nowPokemon.moves}
                    />
                  }
                />
                <Route
                  path="/status"
                  element={<Status stats={nowPokemon.stats} />}
                />
                <Route
                  path="/evolution"
                  element={
                    <Evolutions
                      first_evolv={evolution.first_evolv}
                      seconde_evolve={evolution.seconde_evolve}
                      three_evolve={evolution.three_evolve}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}
