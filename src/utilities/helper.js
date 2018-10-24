export const movieCleaner = movies => {
  return movies.map(movie => {
    return {
      title: movie.title,
      date: movie.release_date,
      poster: "poster_path",
      overView: movie.overview
    };
  });
};
