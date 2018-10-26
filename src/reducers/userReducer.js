export const userReducer = (state = '', action) => {
  switch (action.type) {
    case "SAVE_NAME":
      return action.currentUser;
    default:
      return state;
  }
};