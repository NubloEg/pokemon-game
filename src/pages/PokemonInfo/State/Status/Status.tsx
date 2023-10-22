import React from "react";
import s from "./Status.module.css";
import { Stat } from "../../../../api/pokemonData";

interface Props {
  stats: Stat[];
}

export default function Status({ stats }: Props) {

  return (
    <div className={s.statsContainer}>
      <div className={s.items}>
          {stats.map((stat) => (
            <div className={s.itemStat} key={stat.stat.name}>
              <div className={s.title}>{stat.stat.name}</div>
              <div className={s.value}>{stat.base_stat}</div>
              <div className={s.progressBar}>
                <div
                  style={{ width: `${(stat.base_stat*100)/180}%` }}
                  className={s.progressBarProc}
                ></div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
