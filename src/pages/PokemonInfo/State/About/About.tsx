import React from "react";
import s from "./About.module.css";
import { Ability, Mfe } from "../../../../api/pokemonData";

import weightIcon from "../../../../assets/icons/PokemonInfo/about_weight.svg"
import heightIcon from "../../../../assets/icons/PokemonInfo/about_height.svg"
import moveIcon from "../../../../assets/icons/PokemonInfo/about_category.svg"
import abilityIcon from "../../../../assets/icons/PokemonInfo/about_ability.svg"


interface Props {
  about: string;
  weight: number;
  height?: number;
  moves?: Mfe[];
  ability?: Ability[];
}

export default function About({
  about,
  weight,
  ability,
  moves,
  height,
}: Props) {
  return (
    <div className={s.container}>
      <div className={s.about}>{about}</div>
      <div className={s.mainStats}>
        <div className={s.abotInfo}>
          <div className={s.title}>
            <img src={weightIcon} alt="icon" />
            <span>Weight</span>
          </div>
          <div className={s.value}>{weight/10} kg</div>
        </div>
        <div className={s.abotInfo}>
          <div className={s.title}>
            <img src={heightIcon} alt="icon" />
            <span>Height</span>
          </div>
          <div className={s.value}>{height && height/10} m</div>
        </div>
        <div className={s.abotInfo}>
          <div className={s.title}>
            <img src={moveIcon} alt="icon" />
            <span>Move</span>
          </div>
          <div className={s.value}>{moves && moves[0].move.name}</div>
        </div>
        <div className={s.abotInfo}>
          <div className={s.title}>
            <img src={abilityIcon} alt="icon" />
            <span>Ability</span>
          </div>
          <div className={s.value}>{ability && ability[0].ability.name}</div>
        </div>
      </div>
    </div>
  );
}
