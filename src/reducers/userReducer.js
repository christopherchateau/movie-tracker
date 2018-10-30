export const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SAVE_USERDATA":
      return {
        name: action.currentUser,
        id: action.id
      };
    default:
      return state;
  }
};
