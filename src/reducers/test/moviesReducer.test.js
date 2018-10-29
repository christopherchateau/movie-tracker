import { moviesReducer } from '../moviesReducer.js';

describe('moviesReducer', () => {
	it('should return the initial state', () => {
		const expected = []
		const result = moviesReducer(undefined, {})
		expect(result).toEqual(expected)
	})

	it('should load movies in state', () => {
		const mockState = {
			movies: []
		}

		const expected = [{ 
				title: 'Millers Crossing' 
			}]

		const action = {
			type: 'LOAD_MOVIES',
			movies: [{
				title: 'Millers Crossing'
			}]
		}

		const result = moviesReducer(mockState, action)
		expect(result).toEqual(expected)
	})

	it('should toggle favorite in state', () => {
		const mockState = [
				{
				title: 'Millers Crossing',
				favorited: false
			 	}
			]

		const expected = [
				{	
				title: 'Millers Crossing',
				favorited: true
			 	}
			]

		const action = {
			type: 'TOGGLE_FAVORITE',
			movies: {
				title: 'Millers Crossing',
				favorited: true
			 }
		    }

		const result = moviesReducer(mockState, action)
		expect(result).toEqual(expected)
	})

	it('should reset favorites in state', () => {
		const mockState = [
			{
			title: 'Millers Crossing',
			favorited: true
		 	}
		]

		const expected = [
				{	
				title: 'Millers Crossing',
				favorited: false
			 	}
			]

		const action = {
			type: 'RESET_FAVORITES'
		    }

		const result = moviesReducer(mockState, action)
		expect(result).toEqual(expected)
	})
})