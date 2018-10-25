import { loginReducer } from '../loginReducer.js';

describe('loginReducer', () => {
	it('should return the initial state', () => {
		const expected = false
		const result = loginReducer(undefined, {})
		expect(result).toEqual(expected)
	})

	it('should toggle login in state', () => {
		const mockState = {
			loggedIn: false
		}

		const expected = {
			loggedIn: true
		}

		const action = {
			type: 'TOGGLE_LOGIN',
			loggedIn: true
		}

		const result = loginReducer(mockState, action)
		expect(result).toEqual(expected)
	})
})