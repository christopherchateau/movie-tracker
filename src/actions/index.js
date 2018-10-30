export const loadMovies = movies => ({
  type: "LOAD_MOVIES",
  movies
});

export const displayFavorites = bool => ({
  type: "DISPLAY_FAVORITES",
  displayFavorites: bool
});

export const logIn = bool => ({
  type: "TOGGLE_LOGIN",
  loggedIn: bool
});

export const saveUserData = (name, id) => ({
  type: "SAVE_USERDATA",
  currentUser: name,
  id
});

export const toggleFavorite = id => ({
  type: "TOGGLE_FAVORITE",
  id
});

export const resetFavorites = () => ({
  type: "RESET_FAVORITES"
});

export const setErrorMessage = errorMessage => ({
  type: "SET_ERROR_MESSAGE",
  errorMessage
});
