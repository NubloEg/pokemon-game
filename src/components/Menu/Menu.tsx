import React from "react";
import { Link } from "react-router-dom";
import s from "./Menu.module.css";
import {ReactComponent as Home} from "../../assets/icons/Home.svg";
import {ReactComponent as Like} from "../../assets/icons/liked.svg";
import {ReactComponent as Shop} from "../../assets/icons/shop.svg";
import {ReactComponent as Person} from "../../assets/icons/person.svg";
import { useSelector } from "react-redux";
import { selectCurrentPage } from "../../redux/profileSlice";


export default function Menu() {
  const currentPage=useSelector(selectCurrentPage)

  return (
    <div className={s.menu}>
      <Link to={"/home"} className={`${s.menu_icon} ${currentPage==="home" && s.active}`}>
        <Home className={s.img}/>
      </Link>
      <Link to={"/pokemons"} className={s.menu_icon}>
        <Like className={s.img}/>
      </Link>
      <Link to={"/shop"} className={s.menu_icon}>
        <Shop className={s.img}/>
      </Link>
      <Link to={"/profile"} className={s.menu_icon}>
        <Person className={s.img}/>
      </Link>
    </div>
  );
}
