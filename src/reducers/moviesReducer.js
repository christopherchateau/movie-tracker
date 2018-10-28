export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_MOVIES":
      return action.movies;
    case "TOGGLE_FAVORITE":
      return state.map(movie => {
        return movie.id === action.id
          ? { ...movie, favorited: !movie.favorited }
          : movie;
      });
    case "RESET_FAVORITES":
      return state.map(movie => (movie.favorited = false));
    default:
      return state;
  }
};
