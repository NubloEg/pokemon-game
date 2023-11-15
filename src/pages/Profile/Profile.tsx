import React, { useEffect } from "react";
import { selectProfile, setProfile } from "../../redux/profileSlice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import s from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setErrors } from "../../redux/errorsSlice";

export default function Profile() {
  const profile=useSelector(selectProfile)
  const dispatch=useDispatch()

  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`https://pokemon-api-r32m.onrender.com/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          throw new Error(data.message);
        }
        dispatch(setProfile({email:data.email,fullName:data.fullName}))
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  },[dispatch])
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
        <div className={s.login}>{`${profile.email} ${profile.fullName}`}</div>
      </div>

      {/* <div className={s.settings}>
        <span>Settings</span>
        <div> icon</div>
      </div> */}
     
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
