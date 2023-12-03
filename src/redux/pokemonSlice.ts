import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../api/pokemonData";
import { RootState } from "./store";

export interface pokemonState {
  currentPokemonId?: number;
  myPokemon: Array<string>;
  pokedex?: Pokemon[];
  bossPokemon: Array<{
    name: string;
    url: string;
    hpNow: number;
    hpAll: number;
  }>;
}

const initialState: pokemonState = { myPokemon: [], bossPokemon: [] };

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setCurrentPokemonId: (state, action: PayloadAction<number>) => {
      state.currentPokemonId = action.payload;
    },
    addPokemon: (state, action: PayloadAction<Array<string>>) => {
      state.myPokemon = [...action.payload];
    },
    setBoss: (state, action: PayloadAction<Array<{
      name: string;
      url: string;
      hpNow: number;
      hpAll: number;
    }>>) => {
      state.bossPokemon = [...action.payload];
    },
  },
});

export const { setCurrentPokemonId, addPokemon ,setBoss} = pokemonSlice.actions;

export const selectCurrentPokemon = (state: RootState) =>
  state.pokemonsSlice.currentPokemonId;
export const selectMyPokemons = (state: RootState) =>
  state.pokemonsSlice.myPokemon;
  export const selectBoss = (state: RootState) =>
  state.pokemonsSlice.bossPokemon;

export default pokemonSlice.reducer;
