import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div>
        <Link to={"/"} className="home">Home</Link>
        <Link to={"/pokemons"} className="pokedex">Pokedex</Link>
        <Link to={"/shop"} className="shop">Shop</Link>
    </div>
  )
}
