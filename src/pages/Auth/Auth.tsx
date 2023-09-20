import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";

export default function Auth() {
  const [profile, setProfile] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <>
      <div className={s.authMain}></div>
      <form className={s.form}>
        <h1 className={s.title}>Welcome</h1>
        <div className={s.name}>
          <div className={s.name__title}>Name</div>
          <input
          className={s.input}
          value={profile.login}
          onChange={(e) =>
            setProfile({ login: e.target.value, password: profile.password })
          }
        />
        </div>
        <div className={s.name}>
          <div className={s.name__title}>Password</div>
          <input
          className={s.input}
          value={profile.password}
          onChange={(e) =>
            setProfile({ login: profile.login, password: e.target.value })
          }
        />
        </div>
        
        <Button
          onClick={() => {
            sessionStorage.setItem("profile", JSON.stringify(profile));
            navigate("/firstpokemon");
          }}
        >Login</Button>
      </form>
    </>
  );
}
