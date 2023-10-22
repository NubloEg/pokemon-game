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
import icon from "../../assets/icons/Types/typesIcon";

export default function PokemonInfo() {
  const [nowPokemon, setNowPokemon] = useState<Pokemon | undefined>();
  const [about, setAbout] = useState<Pokedex | undefined>(undefined);
  const [pokemonInfoState, setPokemonInfoState] = useState<string>("about");

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
        console.log(data);
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
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getInfoPokemon(currentPokemonId);
    getAboutPokemon(currentPokemonId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const selectType = (type: string) => {
    const typeSettings = { borderColor: "", src: "" };
    switch (type) {
      case "normal":
        typeSettings.borderColor = "gray";
        typeSettings.src = icon[type]
        break;
      case "fire":
        typeSettings.borderColor = "red";
        typeSettings.src = icon[type]
        break;
      case "water":
        typeSettings.borderColor = "blue";
        typeSettings.src = icon[type]
        break;
      case "electric":
        typeSettings.borderColor = "yellow";
        typeSettings.src = icon[type]
        break;
      case "grass":
        typeSettings.borderColor = "green";
        typeSettings.src = icon[type]
        break;
      case "ice":
        typeSettings.borderColor = "#72e4e8";
        typeSettings.src = icon[type]
        break;
      case "fighting":
        typeSettings.borderColor = "red";
        typeSettings.src = icon[type]
        break;
      case "poison":
        typeSettings.borderColor = "purple";
        typeSettings.src = icon[type]
        break;
      case "ground":
        typeSettings.borderColor = "#d68911";
        typeSettings.src = icon[type]
        break;
      case "flying":
        typeSettings.borderColor = "#ddf5f6";
        typeSettings.src = icon[type]
        break;
      case "psychic":
        typeSettings.borderColor = "purple";
        typeSettings.src = icon[type]
        break;
      case "bug":
        typeSettings.borderColor = "green";
        typeSettings.src = icon[type]
        break;
      case "rock":
        typeSettings.borderColor = "red";
        typeSettings.src = icon[type]
        break;
      case "ghost":
        typeSettings.borderColor = "#cfc5f1";
        typeSettings.src = icon[type]
        break;
      case "dragon":
        typeSettings.borderColor = "yellow";
        typeSettings.src = icon[type]
        break;
      case "dark":
        typeSettings.borderColor = "black";
        typeSettings.src = icon[type]
        break;
      case "steel":
        typeSettings.borderColor = "#d7d7d7";
        typeSettings.src = icon[type]
        break;
      case "fairy":
        typeSettings.borderColor = "#dc01fc";
        typeSettings.src = icon[type]
        break;
    }
    return typeSettings;
  };

  return (
    <>
      {!nowPokemon ? (
        <Loading loading={!nowPokemon} />
      ) : (
        <>
          <div className={s.card}>
            <div className={s.img} style={{backgroundColor:selectType(nowPokemon.types !== undefined ? nowPokemon.types[0].type.name:"").borderColor}}>
              <img
                className={s.pokemonImg}
                alt="pok"
                src={nowPokemon.sprites.other["official-artwork"].front_default}
              />
            </div>
            <h2>{nowPokemon.name}</h2>
            <div className={s.types}>
              {nowPokemon.types?.map((type) => (
                <TypePokemon key={type.type.name} selectType={selectType} typeName={type.type.name} />
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
                {" "}
                About
              </Link>
              <Link
                className={`${s.tab} ${
                  pokemonInfoState === "status" && s.tabActive
                }`}
                to={`/pokemon/${nowPokemon.id}/status`}
                onClick={() => setPokemonInfoState("status")}
              >
                {" "}
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
                <Route path="/status" element={<Status stats={nowPokemon.stats} />} />
                <Route path="/evolution" element={<Evolutions />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}
