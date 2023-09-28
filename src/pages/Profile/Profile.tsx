import React, { useState } from "react";
import { authState } from "../../redux/authSlice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Profile.module.css"

export default function Profile() {
  const [profile] = useState<authState>(
    JSON.parse(sessionStorage.getItem("profile") ?? "")
  );

  const navigate = useNavigate();
  return (
    <div className={s.Profile}>
      <img className={s.avatar} src="https://phonoteka.org/uploads/posts/2021-06/1624059482_8-phonoteka_org-p-pikachu-oboi-krasivo-10.png" alt="ava" />
      <div className={s.login}>
        <span>Name:</span>
        <span>{profile.login}</span>
      </div>
      <div className={s.password}>
        <span>Password:</span>
        <span>{profile.password}</span>
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
