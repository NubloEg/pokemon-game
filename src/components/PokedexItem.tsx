import React from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../api/pokemonData";

interface Props {
  pokemon: {id:number};
}

export default function PokedexItem({ pokemon }: Props) {
  return <Link to={`/pokemon/${pokemon.id}`}>PokedexItem</Link>;
}
