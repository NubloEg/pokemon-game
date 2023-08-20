import React from 'react'
import s from "./Type.module.css"

interface Props {
    typeName:string;
}

export default function TypePokemon({typeName}:Props) {
  return (
    <div className={s.default}>
        <img width="8px" height="8px" src="" alt="type" />
        <span>{typeName}</span>
    </div>
  )
}
