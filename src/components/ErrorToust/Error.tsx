import React, { useEffect } from "react";
import s from "./ErrorToust.module.css";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../redux/errorsSlice";

interface Props {
  message: string;
}

export default function Error({ message }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(clearErrors()), 8000);
  }, [dispatch]);
  return <div className={s.Error}>{message}</div>;
}
