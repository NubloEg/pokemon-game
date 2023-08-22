import React from "react";
import s from "./Button.module.css"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  return <button className={s.default} {...props}>{props.children}</button>;
}
