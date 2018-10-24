import { combineReducers } from "redux";
import { moviesReducer } from './moviesReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  loggedIn: loginReducer
});

export default rootReducer;
