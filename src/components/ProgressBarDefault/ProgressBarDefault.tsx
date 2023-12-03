import React, { useEffect, useState } from "react";
import s from "./ProgressBarDefault.module.css"
interface Props {
  stat: number;
  max: number;
}

export default function ProgressBarDefault({ stat, max }: Props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setTimeout(() => setValue(stat), 1);
  }, [stat]);

  return (
    <div className={s.progressContainer}>
    <div className={s.progressBar}>
      <div
        style={{ height: `${(value * 100) / max}%` }}
        className={s.progressBarProc}
      ></div>
    </div>
    <div style={{fontWeight:700}}>{stat}/{max}</div>
    </div>
  );
}
