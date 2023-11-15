import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface errorsState {
 errors:Array<string>
}

const initialState: errorsState = {
  errors:[]
};

export const errorsSlice=createSlice({
    name:"errorsSlice",
    initialState,
    reducers: {
       setErrors:(state, action: PayloadAction<string>) => {
        state.errors.unshift( action.payload) 
      },
      clearErrors:(state) => {
        state.errors.pop()
      },
      },
})


export const {setErrors,clearErrors } = errorsSlice.actions;

export const selectErrors = (state: RootState) => state.errorsSlice.errors;


export default errorsSlice.reducer;