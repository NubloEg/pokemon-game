import React, { useState } from "react";
import s from "./Home.module.css";
import { useSelector } from "react-redux";
import {
  selectBoss,
  selectMyPokemons,
  setBoss,
} from "../../redux/pokemonSlice";
import PokedexItem from "../../components/PokedexItem/PokedexItem";
import { setErrors } from "../../redux/errorsSlice";
import { useDispatch } from "react-redux";
import ProgressBarDefault from "../../components/ProgressBarDefault/ProgressBarDefault";
import Button from "../../components/Button/Button";
import {
  selectFightDay,
  selectMoney,
  setFightDay,
  setMoney,
} from "../../redux/profileSlice";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const pokemons = useSelector(selectMyPokemons);
  const money = useSelector(selectMoney);
  const actionDay = useSelector(selectFightDay);
  const boss = useSelector(selectBoss);
  const dispatch = useDispatch();
  const [nowBoss] = useState<{
    name: string;
    url: string;
    hpNow: number;
    hpAll: number;
  }>(boss[0]);

  const changeStat = () => {
    fetch(`https://pokemon-api-r32m.onrender.com/money`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        money: money + 200,
      }),
    }
    
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }

        dispatch(setMoney(data));
        dispatch(setFightDay(false));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });

      changeStatusFight()
    const newStateBoss: Array<{
      name: string;
      url: string;
      hpNow: number;
      hpAll: number;
    }> = [];
    boss.forEach((el) => {
      const boss: { name: string; url: string; hpNow: number; hpAll: number } =
        { ...el };
      if (nowBoss && el.name === nowBoss.name) {
        boss.hpNow = el.hpNow - pokemons.length * 20;
      }
      newStateBoss.push(boss);
    });

  

      fetch(`https://pokemon-api-r32m.onrender.com/boss`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        boss: newStateBoss,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }
        dispatch(setBoss(data));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  const changeStatusFight= () => {
    fetch(`https://pokemon-api-r32m.onrender.com/setFigntPokemon`, {
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

        dispatch(setFightDay(false));

      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  return (
    <div className={s.home}>
      <Loading loading={!Boolean(boss.length)} />

      <div className={s.allBoss}>
        {boss.map((bos) => {
          return (
            <div key={bos.name} className={s.boss}>
              <div>
                <img className={s.boss_img} src={bos.url} alt="" />
                <div className={s.boss_title}>{bos.name}</div>
              </div>
              <ProgressBarDefault
                stat={!bos ? 0 : bos.hpNow}
                max={!bos ? 0 : bos.hpAll}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button disabled={!actionDay} onClick={() => changeStat()}>
          Fight
        </Button>
      </div>

      <div className={s.home_pokemons}>
        {pokemons.map((id) => (
          <PokedexItem
            url={`https://pokeapi.co/api/v2/pokemon/${id}`}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
