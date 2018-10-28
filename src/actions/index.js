export const loadMovies = movies => ({
  type: "LOAD_MOVIES",
  movies
});

export const logIn = (loggedIn) => ({
  type: "TOGGLE_LOGIN",
  loggedIn,
});

export const saveUserData = (name, id) => ({
  type: "SAVE_USERDATA",
  currentUser: name,
  id
});

export const toggleFavorite = (id) => ({
  type: "TOGGLE_FAVORITE",
  id
});

export const setErrorMessage = (message) => ({
  type: "SET_ERROR_MESSAGE",
  message
});