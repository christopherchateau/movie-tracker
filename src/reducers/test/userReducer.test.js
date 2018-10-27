import { userReducer } from '../userReducer.js';

describe('userReducer', () => {
  it('should return the initial state', () => {
    const expected = ''
    const result = userReducer(undefined, {})
    expect(result).toEqual(expected)
  })
  it('should assign a users name in state', () => {
    const mockState = {
      currentUser: ''
    }

    const expected = 'Taylor'

    const action = {
      type: 'SAVE_NAME',
      currentUser: 'Taylor'
    }

    const result = userReducer(mockState, action)
    expect(result).toEqual(expected)
  })
})