import React from "react";
import { Stat } from "../api/pokemonData";

interface Props {
  about: string;
  stats: Stat[];
}


export default function About({ about, stats }: Props) {
  return (
    <div>
      <div className="about">{about}</div>
      <div className="mainStats">
        {stats.map((stats) => (
          <div>
            <div className="title">{stats.stat.name}</div>
            <div className="value">{stats.base_stat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
