import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";
import sql from "../../sql.json"

export default function Auth() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  return (
    <>
      <input type="text" style={{backgroundColor:"black",color:"white",padding:"15px"}}/>
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
            if(sql.hasOwnProperty(profile.login)){
              sessionStorage.setItem("profile", JSON.stringify(profile));
              navigate("/firstpokemon");
            }
           
          }}
        >
          Login
        </Button>
      </form>
      <Loading loading={loading}/>
    </>
  );
}

