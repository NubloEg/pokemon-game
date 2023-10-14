import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";

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

  const signUp = () => {
    fetch(`http://localhost:5000/auth/${profile.login}`)
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem('profile', JSON.stringify(data[0]))
        navigate('/firstpokemon')
      })
      .catch((e) => {
        alert("Пользователь не найден");
      });
  };

  return (
    <>
      <div className={s.authMain}></div>
      <div>Register</div>
      <div className={s.form}>
        <h1 className={s.title}>Welcome</h1>
        <div className={s.relative}>
          <div className={s.auth}>
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
          </div>
          <div className={s.register}>
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
          </div>
        </div>

        <Button onClick={() => signUp()} >Login</Button>
      </div>
      <Loading loading={loading} />
    </>
  );
}
