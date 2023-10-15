import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [profile, setProfile] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  const signUp = () => {
    fetch(`http://localhost:5000/auth/sign`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: profile.login,
        password: profile.password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.login){
          sessionStorage.setItem('profile', JSON.stringify(data))
          navigate('/firstpokemon')
        }
      })
      .catch((e) => {
        alert("Пользователь не найден");
      });
  };

  const register = () => {
    fetch(`http://localhost:5000/auth`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: profile.login,
        password: profile.password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem('profile', JSON.stringify(data))
        navigate('/firstpokemon')
      })
      .catch((e) => {
        alert("Ошибка зарегестрировать пользователя не удалось");
      });
  };

  return (
    <>
      <div className={s.authMain}></div>
      <div className={s.form}>
        <h1 className={s.title}>Welcome</h1>
        <div className={s.relative}>
          <div onClick={() => setIsLogin(!isLogin)} className={`${s.switch} ${!isLogin && s.change}`}>{!isLogin ? "Login" : "Register"}</div>
          <div className={`${s.auth} ${!isLogin && s.close}`}>
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
          <div className={`${s.register} ${!isLogin && s.open}`}>
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

        <Button onClick={isLogin ? () => signUp() : () => register()} >{isLogin ? "Login" : "Register"}</Button>
      </div>
      <Loading loading={loading} />
    </>
  );
}
