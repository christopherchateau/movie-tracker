import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { errorMessageReducer } from "./errorMessageReducer";
import { favoritesReducer } from "./favoritesReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  loggedIn: loginReducer,
  currentUser: userReducer,
  errorMessage: errorMessageReducer,
  displayFavorites: favoritesReducer
});

export default rootReducer;
