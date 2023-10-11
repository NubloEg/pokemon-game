import React from "react";
import s from "./ThemeSelector.module.css";
import { useDispatch } from "react-redux";
import { setTheme } from "../../redux/profileSlice";

interface Props {
  theme: string;
}

export default function ThemeSelector({ theme }: Props) {
  const dispatch = useDispatch();

  const switchTheme = () => {
    theme === "light"
      ? dispatch(setTheme("dark"))
      : dispatch(setTheme("light"));
    console.log(theme);
  };
  return (
    <label  className={s.change_theme}>
      <input className={s.checkBox} type="checkbox" />
      <div onClick={() => switchTheme()}  className={s.image}></div>
      <div onClick={() => switchTheme()}  className={s.bg_color}></div>
    </label>
  );
}
