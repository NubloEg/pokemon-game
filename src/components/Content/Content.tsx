import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstPokemon from "../../pages/FirstPokemon/FirstPokemon";
import PokemonInfo from "../../pages/PokemonInfo/PokemonInfo";
import Pokedex from "../../pages/Pokedex/Pokedex";
import Menu from "../Menu/Menu";

export default function Content() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<FirstPokemon />}></Route>
        <Route path="/pokemon/:id/*" element={<PokemonInfo />}></Route>
        <Route path="/pokemons" element={<Pokedex />}></Route>
      </Routes>
      <Menu />
    </>
  );
}
