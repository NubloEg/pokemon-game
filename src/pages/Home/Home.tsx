import React from 'react'
import s from "./Home.module.css"
import { useSelector } from 'react-redux'
import { selectMyPokemons } from '../../redux/pokemonSlice'
import PokedexItem from '../../components/PokedexItem/PokedexItem'

export default function Home() {
  const pokemons=useSelector(selectMyPokemons)

  return (
    <div className={s.home}>
      {
        pokemons.map(item=><PokedexItem url={`https://pokeapi.co/api/v2/pokemon/${item.id}`} key={item.id} />)
      }
    </div>
  )
}
