import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface profileState {
  email?: string;
  fullName?: string;
  theme:string;
  currentPage?:string;
  money:number;
  pokemonDay:boolean;
  fightDay:boolean;
}

const initialState: profileState = {
  theme:"light",
  money:0,
  pokemonDay:true,
  fightDay:true
};

export const profileSlice=createSlice({
    name:"profileSlice",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{email:string,fullName:string,money:number}>) => {
         state.email=action.payload.email;
         state.fullName=action.payload.fullName;
         state.money=action.payload.money;
        },
        setTheme:(state,action:PayloadAction<string>)=>{
          state.theme=action.payload
        },
        setCurrentPage:(state,action:PayloadAction<string>)=>{
          state.currentPage=action.payload;
        },
        setMoney:(state,action:PayloadAction<number>)=>{
          state.money=action.payload;
        },
        setPokemonDay:(state,action:PayloadAction<boolean>)=>{
          state.pokemonDay=action.payload;
        },
        setFightDay:(state,action:PayloadAction<boolean>)=>{
          state.fightDay=action.payload;
        }
      },
})


export const {setProfile,setCurrentPage,setTheme,setMoney,setFightDay,setPokemonDay } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profileSlice;
export const selectCurrentPage = (state:RootState) => state.profileSlice.currentPage;
export const selectTheme = (state:RootState) => state.profileSlice.theme;
export const selectMoney = (state:RootState) => state.profileSlice.money;
export const selectFightDay = (state:RootState) => state.profileSlice.fightDay;
export const selectPokemonDay = (state:RootState) => state.profileSlice.pokemonDay;

export default profileSlice.reducer;