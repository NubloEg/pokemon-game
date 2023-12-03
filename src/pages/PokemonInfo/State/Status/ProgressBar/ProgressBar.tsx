import React, { useEffect, useState } from "react";
import s from "../Status.module.css";

interface Props {
    stat:number;
    max?:number
}

export default function ProgressBar({stat,max=180}:Props) {
    const [value,setValue]=useState(0)
    useEffect(()=>{
        setTimeout(()=>setValue(stat),1)
    },[])

  return (
    <div className={s.progressBar}>
      <div
        style={{ width: `${(value * 100) / max}%` }}
        className={s.progressBarProc}
      ></div>
    </div>
  );
}
