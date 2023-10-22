import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [profile, setProfile] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  const signUp = () => {
    fetch(`http://localhost:4444/api/auth/login`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: profile.email,
        password: profile.password
      })
    })
      .then((response) =>{
        if(!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then((data) => {
        if(data.hasOwnProperty('error')){
          console.log(data.message[0])
         throw new Error(data.message[0])
        }
        sessionStorage.setItem('profile', JSON.stringify(data))
        navigate('/firstpokemon')
      })
      .catch((e) => {
        alert(e);
      });
  };

  const register = () => {
    fetch(`http://localhost:4444/api/user`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: profile.email,
        password: profile.password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.hasOwnProperty('error')){
          console.log(data.message[0])
         throw new Error(data.message[0])
        }
        sessionStorage.setItem('profile', JSON.stringify(data))
        navigate('/firstpokemon')
        
      })
      .catch((e) => {
        alert(e);
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
              <div className={s.name__title}>Email</div>
              <input
                className={s.input}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ email: e.target.value, password: profile.password })
                }
              />
            </div>
            <div className={s.name}>
              <div className={s.name__title}>Password</div>
              <input
                className={s.input}
                value={profile.password}
                onChange={(e) =>
                  setProfile({ email: profile.email, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className={`${s.register} ${!isLogin && s.open}`}>
            <div className={s.name}>
              <div className={s.name__title}>Email</div>
              <input
                className={s.input}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ email: e.target.value, password: profile.password })
                }
              />
            </div>
            <div className={s.name}>
              <div className={s.name__title}>Password</div>
              <input
                className={s.input}
                value={profile.password}
                onChange={(e) =>
                  setProfile({ email: profile.email, password: e.target.value })
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
