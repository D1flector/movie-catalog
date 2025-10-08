import { favouriteReducer, addFavourite, deleteFavourite } from "../favouriteSlice";
import type { FavouriteItem } from "../favouriteSlice";

describe('favouriteSlice reducers', () => {
  test('Должен возвращать начальное состояние', () => {
     const initialState = favouriteReducer(undefined, {type: 'unknown'});

     expect(initialState.items).toEqual([]);
  }),
  
  test('Должен добавлять новый элемент в пустой список', () => {
    const previousState = { items: [] };
    const newItem: FavouriteItem = {id: 550, type: 'movie'};
    const newState = favouriteReducer(previousState, addFavourite(newItem));

    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual(newItem);
  }),

  test('Должен не добавлять дубликат элемента в список', () => {
    const existingItem: FavouriteItem = {id: 550, type: 'movie'};
    const previousState = { items: [existingItem] };
    const duplicateItem: FavouriteItem = {id: 550, type: 'movie'}
    const newState = favouriteReducer(previousState, addFavourite(duplicateItem));
    
    expect(newState.items.length).toBe(1);
    expect(newState.items).toEqual(previousState.items);
  }),
})