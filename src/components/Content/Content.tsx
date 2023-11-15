import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PokemonInfo from "../../pages/PokemonInfo/PokemonInfo";
import Pokedex from "../../pages/Pokedex/Pokedex";
import Menu from "../Menu/Menu";
import Profile from "../../pages/Profile/Profile";
import Home from "../../pages/Home/Home";
import Shop from "../../pages/Shop/Shop";
import Money from "../Money/Money";
import ErrorToust from "../ErrorToust/ErrorToust";

export default function Content() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("profile")) {
      navigate("/auth");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <Money/>
      <div className="flex">
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/pokemon/:id/*" element={<PokemonInfo />}></Route>
          <Route path="/pokemons" element={<Pokedex />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Menu />
      </div>
      <ErrorToust />
    </>
  );
}
