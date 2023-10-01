import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface profileState {
  login?: string;
  password?: string;
  theme:string;
  currentPage?:string;
}

const initialState: profileState = {
  theme:"Light"
};

export const profileSlice=createSlice({
    name:"profileSlice",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{login:string,password:string}>) => {
         state.login=action.payload.login;
         state.password=action.payload.password;
        },
        setTheme:(state,action:PayloadAction<string>)=>{
          state.theme=action.payload
        },
        setCurrentPage:(state,action:PayloadAction<string>)=>{
          state.currentPage=action.payload;
        }
      },
})


export const {setProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.pokemonsSlice.currentPokemonId;
export const selectCurrentPage = (state:RootState) => state.profileSlice.currentPage;

export default profileSlice.reducer;