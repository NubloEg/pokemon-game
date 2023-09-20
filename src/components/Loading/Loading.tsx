import React, { useEffect, useState } from "react";
import s from "./Loading.module.css";

interface Props {
  loading: boolean;
}

export default function Loading({ loading }: Props) {
  const [pokemonIcon, setPokemonIcon] = useState("pokeball");
  function getRandomArbitrary(min: number, max: number): number {
    let result = Math.random() * (max - min) + min;
    return Math.floor(result);
  }

  useEffect(() => {
    setTimeout(() => {
      setPokemonIcon(getRandomArbitrary(1, 3).toString());
    }, 2000);
  }, []);

  return (
    <div className={`${s.conteiner} ${loading ? "" : s.close}`}>
      <img
        className={`${s.image} ${loading ? "" : s.stop}`}
        src={require(`../../assets/icons/Loading/${pokemonIcon}.png`)}
        alt="icon"
      />
    </div>
  );
}
