import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pokemon } from "../../api/pokemonData";
import logo from "../../assets/images/randomBox.svg";
import Button from "../../components/Button/Button";
import s from "./FirstPokemon.module.css";
import { useDispatch } from "react-redux";
import {
  addPokemon,
  setBoss,
  setCurrentPokemonId,
} from "../../redux/pokemonSlice";
import Loading from "../../components/Loading/Loading";
import Money from "../../components/Money/Money";
import { setErrors } from "../../redux/errorsSlice";
import {
  setFightDay,
  setPokemonDay,
  setProfile,
} from "../../redux/profileSlice";

export default function FirstPokemon() {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  const navigate = useNavigate();
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
        dispatch(setCurrentPokemonId(data.id));
        addPokemonDB(`${data.id}`);
        changeStatusFirstPokemon();
        setLoading(false);
      })
      .catch((e) => {
        alert("Покемон не найден");
      });
  };

  const addPokemonDB = (id: string) => {
    fetch(`https://pokemon-api-r32m.onrender.com/pokemon`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        pokemonId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }

        dispatch(addPokemon(data));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  const changeStatusFirstPokemon = () => {
    fetch(`https://pokemon-api-r32m.onrender.com/setAddPokemon`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }

        dispatch(setPokemonDay(false));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  useEffect(() => {
    getMe();
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
        if (!data.getFirstPokemon) {
          navigate("/home");
        }
        dispatch(setFightDay(data.fightToDay));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  return (
    <>
      <Money />
      <div className={s.mainBox}>
        {randomPokemon ? (
          <>
            <Loading loading={loading} />
            <div>
              <h1>Congratulations</h1>
              <Link to={`/pokemon/${randomPokemon.id}/about`}>
                <img
                  className={s.imgPokemon}
                  src={
                    randomPokemon.sprites.other?.["official-artwork"]
                      .front_default
                  }
                  alt=""
                />
                <h2 className={s.name}>{randomPokemon.name}</h2>
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
    </>
  );
}
