import React from "react";
import s from "./Modal.module.css";
import Button from "../Button/Button";

interface Props {
  isOpen: boolean;
  setOpen: (s: boolean) => void;
  description: string;
  price: number;
}

export default function Modal({ isOpen = false, description, price, setOpen }: Props) {

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(false)
  }

  return (
    <div onMouseDown={(e) => closeModal(e)} className={`${s.modal} ${!isOpen && s.open}`}>
      <div className={s.content}>
        <div className={s.description}>{description}</div>
        <div className={s.price}>{price}</div>
        <div className={s.buttons}>
          <Button >Нет</Button>
          <Button >Да</Button>
        </div>
      </div>
    </div>
  );
}
