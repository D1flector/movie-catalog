import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    }
  }
})

export const searchReducer = searchSlice.reducer;
export const { setSearchQuery } = searchSlice.actions;