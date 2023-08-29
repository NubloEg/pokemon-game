import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface authState {
  login?: string;
  password?: string;
}

const initialState: authState = {};

export const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{login:string,password:string}>) => {
         state.login=action.payload.login;
         state.password=action.payload.password;
        },
      },
})


export const {setProfile } = authSlice.actions;

export const selectProfile = (state: RootState) => state.pokemonsSlice.currentPokemonId;

export default authSlice.reducer;