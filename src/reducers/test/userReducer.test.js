import { userReducer } from "../userReducer.js";

describe("userReducer", () => {
  it("should return the initial state", () => {
    const expected = "";
    const result = userReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it("should assign a users name in state", () => {
    const mockState = {
      currentUser: {},
      id: null
    };

    const expected = {
      id: 3,
      name: "Taylor"
    };

    const action = {
      type: "SAVE_USERDATA",
      currentUser: "Taylor",
      id: 3
    };

    const result = userReducer(mockState, action);
    expect(result).toEqual(expected);
  });

  // it('should assign a users id in state', () => {
  //   const mockState = {
  //     id: null
  //   }

  //   const expected = 3

  //   const action = {
  //     type: 'SAVE_USERDATA',
  //     id: 3
  //   }

  //   const result = userReducer(mockState,)
  // })
});
