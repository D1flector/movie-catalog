import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavouriteItem {
  id: number;
  type: 'movie' | 'tv';
}

interface FavouriteState {
  items: FavouriteItem[];
}

const loadFavouritesFromLocalStorage = (): FavouriteItem[] => {
  try {
    const serializedState = localStorage.getItem('favouriteItems');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState) as FavouriteItem[]; 
  } catch (e) {
    console.warn("Не удалось загрузить состояние из localStorage:", e);
    return [];
  }
};

const saveFavouritesToLocalStorage = (items: FavouriteItem[]) => {
  try {
    const serializedState = JSON.stringify(items);
    localStorage.setItem('favouriteItems', serializedState);
  } catch (e) {
    console.error("Не удалось сохранить состояние из localStorage:", e);
  }
};

const initialState: FavouriteState = {
  items: loadFavouritesFromLocalStorage(),
}

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      const newItem = action.payload;
    
      const isExisting = state.items.some(
        item => item.id === newItem.id && item.type === newItem.type
      );

      if (!isExisting) {
        state.items.push(newItem);
        saveFavouritesToLocalStorage(state.items); 
      }
    },
    
    deleteFavourite: (state, action: PayloadAction<FavouriteItem>) => { 
      const itemToDelete = action.payload;

      state.items = state.items.filter(
        item => !(item.id === itemToDelete.id && item.type === itemToDelete.type)
      );
      
      saveFavouritesToLocalStorage(state.items); 
    }
  }
})

export const favouriteReducer = favouriteSlice.reducer;
export const { addFavourite, deleteFavourite } = favouriteSlice.actions;