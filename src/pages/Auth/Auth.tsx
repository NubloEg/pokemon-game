import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Auth.module.css";
import Loading from "../../components/Loading/Loading";
import ErrorToust from "../../components/ErrorToust/ErrorToust";
import { useDispatch } from "react-redux";
import { setErrors } from "../../redux/errorsSlice";
import { setFightDay, setPokemonDay, setProfile } from "../../redux/profileSlice";
import { addPokemon, setBoss } from "../../redux/pokemonSlice";

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfileLocal] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const redirect = (date: string) => {
    const dateNow = new Date();
    var dd = String(dateNow.getDate()).padStart(2, "0");
    var mm = String(dateNow.getMonth() + 1).padStart(2, "0");
    
    console.log(date.slice(5, 10),`${mm}-${dd}`)
    changeStatusFirstPokemon(!(date.slice(5, 10) === `${mm}-${dd}`))
    changeStatusFight(!(date.slice(5, 10) === `${mm}-${dd}`))
    if (date.slice(5, 10) === `${mm}-${dd}`) {
      navigate("/home");
    } else {
      navigate("/firstpokemon");
      
    }
  };

  const changeStatusFight= (status:boolean) => {
    fetch(`https://pokemon-api-r32m.onrender.com/setFigntPokemon`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }

        dispatch(setFightDay(status));

      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  const changeStatusFirstPokemon = (status:boolean) => {
    fetch(`https://pokemon-api-r32m.onrender.com/setAddPokemon`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }

        dispatch(setPokemonDay(status));

      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  };

  //Login
  const login = () => {
    setIsFetchData(true);
    fetch(`https://pokemon-api-r32m.onrender.com/auth/login`, {
      method: "post",
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
        dispatch(
          setProfile({
            email: data.email,
            fullName: data.fullName,
            money: data.money,
          })
        );

        dispatch(addPokemon(data.pokemons));
        dispatch(setBoss(data.boss));
        sessionStorage.setItem("token", data.token);
        dispatch(setPokemonDay(data.getFirstPokemon));
        dispatch(setFightDay(data.fightToDay));

        redirect(data.updatedAt);
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      })
      .finally(() => {
        setIsFetchData(false);
      });
  };

  //Register
  const register = () => {
    setIsFetchData(true);
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
        dispatch(
          setProfile({
            email: data.email,
            fullName: data.fullName,
            money: data.money,
          })
        );
        dispatch(setBoss(data.boss));
        dispatch(addPokemon([]));
        sessionStorage.setItem("token", data.token);
        navigate("/firstpokemon");
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      })
      .finally(() => {
        setIsFetchData(false);
      });
  };

  //ClickEnter
  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      isLogin ? login() : register();
    }
  };

  const onClickEnterButton = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === "Enter") {
      isLogin ? login() : register();
    }
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
              onKeyDown={(e) => onClickEnter(e)}
              onChange={(e) =>
                setProfileLocal({
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
              onKeyDown={(e) => onClickEnter(e)}
              onChange={(e) =>
                setProfileLocal({
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
              onKeyDown={(e) => onClickEnter(e)}
              onChange={(e) =>
                setProfileLocal({
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
          <div style={{ position: "relative" }}>
            <Loading borderRadius="20px" loading={isFetchData} />
            <Button
              onKeyDown={(e) => onClickEnterButton(e)}
              onClick={() => (isLogin ? login() : register())}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </div>
      </div>
      <Loading loading={loading} />
      <ErrorToust />
    </>
  );
}
