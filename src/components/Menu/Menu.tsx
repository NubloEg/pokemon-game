import React from "react";
import { Link } from "react-router-dom";
import s from "./Menu.module.css";
import {ReactComponent as Home} from "../../assets/icons/Home.svg";
import {ReactComponent as Like} from "../../assets/icons/liked.svg";
import {ReactComponent as Shop} from "../../assets/icons/shop.svg";
import {ReactComponent as Person} from "../../assets/icons/person.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../redux/profileSlice";


export default function Menu() {
  const currentPage=useSelector(selectCurrentPage)
  const dispatch=useDispatch();

  const selectPage =(page:string)=>{
    dispatch(setCurrentPage(page))
  }

  return (
    <div className={s.menu}>
      <Link onClick={()=>selectPage("home")} to={"/home"} className={`${s.menu_icon} ${currentPage==="home" && s.active}`}>
        <Home className={s.img}/>
      </Link>
      <Link onClick={()=>selectPage("pokedex")} to={"/pokemons"} className={`${s.menu_icon} ${currentPage==="pokedex" && s.active}`}>
        <Like className={s.img}/>
      </Link>
      <Link onClick={()=>selectPage("shop")} to={"/shop"} className={`${s.menu_icon} ${currentPage==="shop" && s.active}`}>
        <Shop className={s.img}/>
      </Link>
      <Link onClick={()=>selectPage("profile")} to={"/profile"} className={`${s.menu_icon} ${currentPage==="profile" && s.active}`}>
        <Person className={s.img}/>
      </Link>
    </div>
  );
}
