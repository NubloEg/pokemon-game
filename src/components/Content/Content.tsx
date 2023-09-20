import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PokemonInfo from "../../pages/PokemonInfo/PokemonInfo";
import Pokedex from "../../pages/Pokedex/Pokedex";
import Menu from "../Menu/Menu";
import Profile from "../../pages/Profile/Profile";

export default function Content() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("profile")) {
      navigate("/auth");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className="flex">
      <Routes>
        <Route path="/pokemon/:id/*" element={<PokemonInfo />}></Route>
        <Route path="/pokemons" element={<Pokedex />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <Menu />
    </div>
  );
}
