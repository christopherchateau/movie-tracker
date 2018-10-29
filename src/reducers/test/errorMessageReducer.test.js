import { errorMessageReducer } from '../errorMessageReducer';

describe('errorMessageReducer', () => {
	it('should return the initial state', () => {
		const expected = ''
		const result = errorMessageReducer(undefined, {})
		expect(result).toEqual(expected)
	})

	it('should update error message', () => {
		const mockErrorMessage = 'Enter a valid login'

		const mockState = ''

		const expected = 'Enter a valid login'

		const action = {
			type: 'SET_ERROR_MESSAGE',
			  errorMessage: mockErrorMessage
		}

		const result = errorMessageReducer(mockState, action)
		expect(result).toEqual(expected)
	})
})