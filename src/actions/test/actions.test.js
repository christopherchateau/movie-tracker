import * as actions from '../index.js'

describe('actions', () => {
	it('should have a type of LOAD_MOVIES', () => {
		const movies = []
		const expectedAction = {
			type: 'LOAD_MOVIES',
			movies
		}

		const result = actions.loadMovies(movies)
		expect(result).toEqual(expectedAction)
	})

	it('should have a type of TOGGLE_LOGIN', () => {
		const loggedIn = false
		const expectedAction = {
			type: 'TOGGLE_LOGIN',
			loggedIn
		}

		const result = actions.logIn(loggedIn)
		expect(result).toEqual(expectedAction)
	})
})