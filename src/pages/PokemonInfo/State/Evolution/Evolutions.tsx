import React, { useEffect, useState } from "react";

export default function Evolutions(evolution: {
  first_evolv: string;
  seconde_evolve: string;
  three_evolve: string;
}) {
  const [pokemonsEvolution] = useState<
    Array<{ img: string; name: string }>
  >([]);
  // const getInfoPokemon = (url?: string) => {
  //   fetch(`${url}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPokemonEvolution([
  //         ...pokemonsEvolution,
  //         {
  //           img: data.sprites.other["official-artwork"].front_default,
  //           name: data.name,
  //         },
  //       ]);
  //       console.log(pokemonsEvolution);
  //     })
  //     .catch((e) => {
  //       alert("Покемон не найден");
  //     });
  // };

  useEffect(() => {
    // getInfoPokemon(evolution.first_evolv);
    // getInfoPokemon(evolution.seconde_evolve);
    // getInfoPokemon(evolution.three_evolve);
  }, []);

  return (
    <div>
      <div className="evolution">
        {pokemonsEvolution.length ? (
          pokemonsEvolution.map((pokemon) => (
            <>
              <img alt="ic" width={"178px"} src={pokemon.img} />
              <div className="name">{pokemon.name}</div>
            </>
          ))
        ) : (
          <span style={{fontSize:"24px",color:"red",fontWeight:700}}>Еще в разработке</span>
        )}
      </div>
    </div>
  );
}
