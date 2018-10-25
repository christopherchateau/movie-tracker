export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN":
      return {loggedIn: action.loggedIn};
    default:
      return state;
  }
};
