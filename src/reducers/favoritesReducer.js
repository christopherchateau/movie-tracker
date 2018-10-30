export const favoritesReducer = (state = false, action) => {
  switch (action.type) {
    case "DISPLAY_FAVORITES":
    return !action.displayFavorites;
    default:
      return state;
  }
};