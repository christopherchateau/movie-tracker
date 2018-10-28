export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_MOVIES":
      return action.movies;
    case "TOGGLE_FAVORITES":
      return state.map(movie => {
        return movie.id === action.id
          ? { ...movie, favorited: !movie.favorited }
          : movie;
      });
    default:
      return state;
  }
};
