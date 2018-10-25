import { loginReducer } from '../loginReducer.js';

describe('loginReducer', () => {
	it('should return the initial state', () => {
		const expected = false
		const result = loginReducer(undefined, {})
		expect(result).toEqual(expected)
	})
})