import React from "react";
import s from "./Modal.module.css";
import Button from "../Button/Button";

export default function Modal() {
  return (
    <div className={s.modal}>
     <div className={s.content}>
     <Button>Нет</Button>
      <Button>Да</Button>
     </div>
    </div>
  );
}
