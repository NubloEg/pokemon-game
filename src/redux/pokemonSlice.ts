import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../api/pokemonData";
import { RootState } from "./store";

export interface pokemonState {
  currentPokemonId?: number;
  pokedex?: Pokemon[];
}

const initialState: pokemonState = {};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setCurrentPokemonId: (state, action: PayloadAction<number>) => {
      state.currentPokemonId = action.payload;
    },
  },
});

export const {setCurrentPokemonId } = pokemonSlice.actions;

export const selectAutomationState = (state: RootState) => state.pokemonsSlice.currentPokemonId;

export default pokemonSlice.reducer;
