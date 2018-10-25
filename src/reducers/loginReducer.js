export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN":
      return !action.loggedIn;
    default:
      return state;
  }
};
