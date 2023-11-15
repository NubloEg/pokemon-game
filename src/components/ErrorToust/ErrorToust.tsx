import React from "react";
import s from "./ErrorToust.module.css";
import { useSelector } from "react-redux";
import { selectErrors } from "../../redux/errorsSlice";
import Error from "./Error";


export default function ErrorToust() {
  const errors = useSelector(selectErrors)
  return (
    <div className={s.errorTost}>
      {errors.map((message) => (
        <Error key={message} message={message}/>
      ))}
    </div>
  );
}
