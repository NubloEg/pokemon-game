import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface profileState {
  email?: string;
  fullName?: string;
  theme:string;
  currentPage?:string;
}

const initialState: profileState = {
  theme:"light"
};

export const profileSlice=createSlice({
    name:"profileSlice",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{email:string,fullName:string}>) => {
         state.email=action.payload.email;
         state.fullName=action.payload.fullName;
        },
        setTheme:(state,action:PayloadAction<string>)=>{
          state.theme=action.payload
        },
        setCurrentPage:(state,action:PayloadAction<string>)=>{
          state.currentPage=action.payload;
        }
      },
})


export const {setProfile,setCurrentPage,setTheme } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profileSlice;
export const selectCurrentPage = (state:RootState) => state.profileSlice.currentPage;
export const selectTheme = (state:RootState) => state.profileSlice.theme;

export default profileSlice.reducer;