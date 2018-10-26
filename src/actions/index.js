export const loadMovies = movies => ({
  type: "LOAD_MOVIES",
  movies
});

export const logIn = (loggedIn) => ({
  type: "TOGGLE_LOGIN",
  loggedIn: loggedIn
});

export const saveName = (name) => ({
  type: "SAVE_NAME",
  currentUser: name
});

