import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData";
import logo from "../../assets/images/randomBox.svg";
import Button from "../../components/Button/Button";
import s from "./FirstPokemon.module.css";
import { useDispatch } from "react-redux";
import { addPokemon, setCurrentPokemonId } from "../../redux/pokemonSlice";
import Loading from "../../components/Loading/Loading";

export default function FirstPokemon() {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  function getRandomArbitrary(min: number, max: number): number {
    let result = Math.random() * (max - min) + min;
    return Math.floor(result);
  }

  const dispatch = useDispatch();

  const randomPokemonFun = (id: number) => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomArbitrary(1, id)}`)
      .then((response) => response.json())
      .then((data) => {
        setRandomPokemon(data);
        console.log(data);
        dispatch(setCurrentPokemonId(data.id));
        dispatch(addPokemon(data));
        setLoading(false);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  return (
    <div className={s.mainBox}>
      {randomPokemon ? (
        <>
          <Loading loading={loading} />
          <div>
            <h1 style={{fontSize:"80px"}}>Congratulations</h1>
            <Link to={`/pokemon/${randomPokemon.id}/about`}>
              <img
                height={"470px"}
                src={
                  randomPokemon.sprites.other?.["official-artwork"]
                    .front_default
                }
                alt=""
              />
              <h2 style={{fontSize:"80px"}} className={s.name}>{randomPokemon.name}</h2>
            </Link>
          </div>
        </>
      ) : (
        <div>
          <img height={"180px"} src={logo} alt="" />
        </div>
      )}
      <Button hidden={!!randomPokemon} onClick={() => randomPokemonFun(1000)}>
        Click to random pokemon!!
      </Button>
    </div>
  );
}
