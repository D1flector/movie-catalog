import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { searchReducer } from "../services/searchSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMidleware) => getDefaultMidleware().concat(api.middleware)
});

setupListeners(store.dispatch)