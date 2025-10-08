import { setSearchQuery, searchReducer } from "../searchSlice";

describe('searchSlice reducers', () => {
  test('Должен возвращать начальное состояние', () => {
    const initialState = searchReducer(undefined, { type: 'unknown' })

    expect(initialState.searchQuery).toBe('')
  });

  test('Должен правильно устанавливать поисковый запрос', () => {
    const previousState = {searchQuery: ''};
    const newQuery = 'матрица';
    const newState = searchReducer(previousState, setSearchQuery(newQuery));

    expect(newState.searchQuery).toBe(newQuery)
  });

  test('Должен правильно очищать поисковой запрос', () => {
    const previousState = {searchQuery: 'матрица'};
    const newState = searchReducer(previousState, setSearchQuery(''))
    
    expect(newState.searchQuery).toBe('')
  });
})