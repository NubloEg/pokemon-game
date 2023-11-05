import React, { useEffect, useState } from "react";
import s from "../Status.module.css";

interface Props {
    stat:number
}

export default function ProgressBar({stat}:Props) {
    const [value,setValue]=useState(0)
    useEffect(()=>{
        setTimeout(()=>setValue(stat),1)
    },[])

  return (
    <div className={s.progressBar}>
      <div
        style={{ width: `${(value * 100) / 180}%` }}
        className={s.progressBarProc}
      ></div>
    </div>
  );
}
