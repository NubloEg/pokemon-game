import React from "react";
import s from "./About.module.css"
import { Stat } from "../../../../api/pokemonData";

interface Props {
  about: string;
  stats: Stat[];
}


export default function About({ about, stats }: Props) {
  return (
    <div>
      <div className={s.about}>{about}</div>
      <div className={s.mainStats}>
        {stats.map((stats) => (
          <div>
            <div className={s.title}>{stats.stat.name}</div>
            <div className={s.value}>{stats.base_stat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
