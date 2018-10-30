import { favoritesReducer } from '../favoritesReducer.js';

describe('favoritesReducer', () => {
  it('should return the initial state', () => {
    const expected = false;
    const result = favoritesReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should update displayFavorites in state to true', () => {
  	const mockState = {
  		displayFavorites: false
  	}

  	const expected = true;
  	

  	const action = {
  		type: 'DISPLAY_FAVORITES',
  		displayFavorites: true
  	}

  	const result = favoritesReducer(mockState, action);
    expect(result).toEqual(expected);
  })
})