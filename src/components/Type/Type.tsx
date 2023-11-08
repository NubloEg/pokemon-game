import React from "react";
import s from "./Type.module.css";

interface Props {
  typeName: string;
  selectType :(type:string)=>any;
}

export default function TypePokemon({ typeName,selectType }: Props) {
  

  const settings = selectType(typeName)

  return (
    <div className={`${s.default}`} style={{ borderColor: settings.borderColor }}>
      <img width="16px" height="16px" src={settings.src} alt="type" />
      <span>{typeName}</span>
    </div>
  );
}
