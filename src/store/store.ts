import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { searchReducer } from "./slices/searchSlice";
import { favouriteReducer } from "./slices/favouriteSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    search: searchReducer,
    favourite: favouriteReducer,
  },
  middleware: (getDefaultMidleware) => getDefaultMidleware().concat(api.middleware)
});

setupListeners(store.dispatch)