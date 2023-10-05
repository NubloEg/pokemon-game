import React from "react";
import s from "./ThemeSelector.module.css";


export default function ThemeSelector() {
  return (
    <label className={s.change_theme}>
      <input className={s.checkBox} type="checkbox" />
      <div className={s.image}></div>
      <div className={s.bg_color}></div>
    </label>
  );
}
