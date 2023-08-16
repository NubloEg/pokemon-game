import React from "react";
import About from "../components/About.tsx";
import Status from "../components/Status.tsx";
import Evolutions from "../components/Evolutions.tsx";
import { Link, Route, Routes } from "react-router-dom";

export default function PokemonInfo() {
  return (
    <>
      <Link to="/">Back</Link>
      <div className="card">
        <img
          alt="pok"
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png"
        />
        <div className="types">
          <span>grass</span>
          <span>poison</span>
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
                about={"SFASFASFASDSADMKLSAMCKLSAK"}
                stats={[
                  { title: "Wxx", value: "6.9kg" },
                  { title: "Ws", value: "6.9kg" },
                  { title: "W", value: "6.9kg" },
                  { title: "W", value: "6.9kg" },
                ]}
              />
            }
          />
          <Route path="/status" element={<Status />} />
          <Route path="/evolution" element={<Evolutions />} />
        </Routes>
      </div>
    </>
  );
}
