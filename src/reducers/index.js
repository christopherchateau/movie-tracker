import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  loggedIn: loginReducer,
  currentUser: userReducer,
});

export default rootReducer;
