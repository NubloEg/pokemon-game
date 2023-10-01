import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import profileReducer from "./profileSlice"

export const store = configureStore({
  reducer: {
    pokemonsSlice: pokemonReducer,
    profileSlice:profileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
