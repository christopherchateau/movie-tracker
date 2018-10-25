export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_MOVIES":
      return {movies: [action.movies]};

    default:
      return state;
  }
};
