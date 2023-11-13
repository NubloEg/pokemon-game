import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfile] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "Egor",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  const signUp = () => {
    fetch(`https://pokemon-api-r32m.onrender.com/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: profile.email,
        password: profile.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message)
        }
        sessionStorage.setItem("profile", JSON.stringify(data));
        navigate("/firstpokemon");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const register = () => {
    fetch(`https://pokemon-api-r32m.onrender.com/auth/register`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: profile.email,
        fullName: profile.fullName,
        password: profile.password,
      }),
    })
      .then((response) => 
      response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }
        if (data.length && data[0].hasOwnProperty("msg")) {
          throw new Error(data[0].msg);
        }
        sessionStorage.setItem("profile", JSON.stringify(data));
        navigate("/firstpokemon");
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
          <div
            onClick={() => setIsLogin(!isLogin)}
            className={`${s.switch} ${!isLogin && s.change}`}
          >
            {!isLogin ? "Login" : "Register"}
          </div>
          <div className={`${s.auth} ${!isLogin && s.close}`}>
            <div className={s.name}>
              <div className={s.name__title}>Email</div>
              <input
                className={s.input}
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    fullName: profile.fullName,
                    email: e.target.value,
                    password: profile.password,
                  })
                }
              />
            </div>
            <div className={s.name}>
              <div className={s.name__title}>Password</div>
              <input
                className={s.input}
                value={profile.password}
                onChange={(e) =>
                  setProfile({
                    fullName: profile.fullName,
                    email: profile.email,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={`${s.register} ${!isLogin && s.open}`}>
            {/* <div className={s.name}>
              <div className={s.name__title}>FullName</div>
              <input
                className={s.input}
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({
                    fullName: e.target.value,
                    email: profile.email,
                    password: profile.password,
                  })
                }
              />
            </div> */}
            <div className={s.name}>
              <div className={s.name__title}>Email</div>
              <input
                className={s.input}
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    fullName: profile.fullName,
                    email: e.target.value,
                    password: profile.password,
                  })
                }
              />
            </div>
            <div className={s.name}>
              <div className={s.name__title}>Password</div>
              <input
                className={s.input}
                value={profile.password}
                onChange={(e) =>
                  setProfile({
                    fullName: profile.fullName,
                    email: profile.email,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <Button onClick={isLogin ? () => signUp() : () => register()}>
          {isLogin ? "Login" : "Register"}
        </Button>
      </div>
      <Loading loading={loading} />
    </>
  );
}
