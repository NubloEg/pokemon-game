import React, { useState } from "react";
import s from "./Shop.module.css";
import Modal from "../../components/Modal/Modal";

export default function Shop() {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={s.shop}>
      {[1, 2, 3].map(() => {
        return (
          <div onClick={()=>setOpen(true)} className={s.itemShop}>
            <img
              style={{ maxWidth: "50px" }}
              src="https://www.pngkit.com/png/full/769-7697923_808-x-989-25-pokemon-go-egg-5k.png"
              alt=""
            />
            <div className="price">300</div>
          </div>
        );
      })}
      <Modal isOpen={isOpen} setOpen={setOpen} description="sdad" price={50} />
    </div>
  );
}
