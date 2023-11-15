import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";
import ErrorToust from "../../components/ErrorToust/ErrorToust";
import { useDispatch } from "react-redux";
import { setErrors } from "../../redux/errorsSlice";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch=useDispatch();
  const [profile, setProfile] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  const login = () => {
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
          throw new Error(data.message);
        }
        sessionStorage.setItem("profile", JSON.stringify(data));
        navigate("/firstpokemon");
      })
      .catch((e) => {
        console.log(e.message)
        dispatch(setErrors(e.message));
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
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }
        if (data.length && data[0].hasOwnProperty("msg")) {
          data.forEach((el: { msg: string }) => {
            dispatch(setErrors(el.msg));
          });
          return;
        }
        sessionStorage.setItem("profile", JSON.stringify(data));
        navigate("/firstpokemon");
      })
      .catch((e) => {
        dispatch(setErrors(e.message));

      });
  };

  return (
    <>
      <div className={s.authMain}></div>
      <div className={s.form}>
        <div className={s.formTitle}>Welcome</div>
        <div className={s.auth}>
          <div className={`${s.input} ${isLogin ? s.none : s.field}`}>
            <div>Name</div>
            <input
              value={profile.fullName}
              onChange={(e) =>
                setProfile({
                  fullName: e.target.value,
                  email: profile.email,
                  password: profile.password,
                })
              }
              type="text"
            />
          </div>
          <div className={s.input}>
            <div>Email</div>
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  fullName: profile.fullName,
                  email: e.target.value,
                  password: profile.password,
                })
              }
              type="email"
            />
          </div>
          <div className={s.input}>
            <div>Password</div>
            <input
              value={profile.password}
              onChange={(e) =>
                setProfile({
                  fullName: profile.fullName,
                  email: profile.email,
                  password: e.target.value,
                })
              }
              type="password"
            />
          </div>
        </div>
        <div className={s.formFooter}>
          <div className={`${s.switcher} ${isLogin ? "" : s.register}`}>
            <span onClick={() => setIsLogin(!isLogin)}>
              {!isLogin ? "Login" : "Register"}
            </span>
          </div>
          <Button onClick={() => (isLogin ? login() : register())}>
            {isLogin ? "Login" : "Register"}
          </Button>
        </div>
      </div>
      <Loading loading={loading} />
      <ErrorToust />
    </>
  );
}
