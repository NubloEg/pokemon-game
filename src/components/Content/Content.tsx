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
import { useDispatch } from "react-redux";
import {
  selectProfile,
  setFightDay,
  setPokemonDay,
  setProfile,
} from "../../redux/profileSlice";
import { setErrors } from "../../redux/errorsSlice";
import { addPokemon, setBoss } from "../../redux/pokemonSlice";
import { useSelector } from "react-redux";

export default function Content() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/auth");
    }
    if (!profile.email) {
      getMe();
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getMe = () => {
    fetch(`https://pokemon-api-r32m.onrender.com/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }
        dispatch(
          setProfile({
            email: data.email,
            fullName: data.fullName,
            money: data.money,
          })
        );
        dispatch(addPokemon(data.pokemons));
        dispatch(setBoss(data.boss));
        dispatch(setPokemonDay(data.getFirstPokemon));
        dispatch(setFightDay(data.fightToDay));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  return (
    <>
      <Money />
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
