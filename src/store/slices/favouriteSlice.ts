import { createSlice } from "@reduxjs/toolkit";

export interface FavouriteItem {
  id: number;
  type: 'movie' | 'tv';
}

interface FavouriteState {
  items: FavouriteItem[];
}

const initialState: FavouriteState = {
  items: [],
}

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const newItem = action.payload as FavouriteItem;
    
      const isExisting = state.items.some(
        item => item.id === newItem.id && item.type === newItem.type
      );

      if (!isExisting) {
        state.items.push(newItem);
      }
    },
    deleteFavourite: (state, action) => {
      const itemToDelete = action.payload as FavouriteItem;

      state.items = state.items.filter(
        item => !(item.id === itemToDelete.id && item.type === itemToDelete.type)
      );
    }
  }
})

export const favouriteReducer = favouriteSlice.reducer;
export const { addFavourite, deleteFavourite } = favouriteSlice.actions;