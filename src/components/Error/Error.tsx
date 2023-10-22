import React from "react";
import s from "./Error.module.css";
interface Props {
  message: string;
}

export default function Error({ message }: Props) {
  return <div className={s.Error}>{message}</div>;
}
