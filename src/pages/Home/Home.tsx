import React, { useEffect } from 'react'
import s from "./Home.module.css"
import { useSelector } from 'react-redux'
import { addPokemon, selectMyPokemons } from '../../redux/pokemonSlice'
import PokedexItem from '../../components/PokedexItem/PokedexItem'
import { setErrors } from '../../redux/errorsSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  const pokemons=useSelector(selectMyPokemons)
  const dispatch=useDispatch()

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
        dispatch(addPokemon(data.pokemons));
      })
      .catch((e) => {
        dispatch(setErrors(e.message));
      });
  },[dispatch])

  return (
    <div className={s.home}>
      {
        pokemons.map(id=><PokedexItem url={`https://pokeapi.co/api/v2/pokemon/${id}`} key={id} />)
      }
    </div>
  )
}
