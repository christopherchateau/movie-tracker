export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_MOVIES":
      return action.movies;
    case "TOGGLE_FAVORITES":
      return state.map(movie => {
        return movie.id === action.id
          ? { ...movie, completed: !movie.completed }
          : movie;
      });
    default:
      return state;
  }
};
