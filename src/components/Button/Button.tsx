import React from "react";
import s from "./Button.module.css"

export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={s.default} {...props}>{props.children}</button>;
}
