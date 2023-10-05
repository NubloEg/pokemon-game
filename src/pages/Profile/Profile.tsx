import React, { useState } from "react";
import { profileState } from "../../redux/profileSlice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Profile.module.css";

export default function Profile() {
  const [profile] = useState<profileState>(
    JSON.parse(sessionStorage.getItem("profile") ?? "")
  );

  const navigate = useNavigate();
  return (
   <div className={s.Profile}>
     <div className={s.Profile_container}>
      <h1>Profile</h1>
      <div>
        <img
          className={s.avatar}
          src="https://lapkus.ru/wp-content/uploads/2023/05/ocr-2023-05-24t104452.248.jpg"
          alt="ava"
        />
        <div className={s.login}>{`${profile.login} ${profile.password}`}</div>
      </div>

      <div className={s.settings}>
        <span>Settings</span>
        <div> icon</div>
      </div>
     
    </div>
    <Button
        onClick={() => {
          navigate("/auth");
          sessionStorage.removeItem("profile");
        }}
      >
        Выход
      </Button>
   </div>
  );
}
