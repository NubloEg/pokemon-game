import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../api/pokemonData";
import { RootState } from "./store";

export interface pokemonState {
  currentPokemonId?: number;
  myPokemon: Pokemon[];
  pokedex?: Pokemon[];
}

const initialState: pokemonState = {myPokemon: []};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setCurrentPokemonId: (state, action: PayloadAction<number>) => {
      state.currentPokemonId = action.payload;
    },
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.myPokemon = [...state.myPokemon, action.payload];
    },
  },
});

export const {setCurrentPokemonId,addPokemon } = pokemonSlice.actions;

export const selectCurrentPokemon = (state: RootState) => state.pokemonsSlice.currentPokemonId;
export const selectMyPokemons = (state: RootState) => state.pokemonsSlice.myPokemon;

export default pokemonSlice.reducer;
