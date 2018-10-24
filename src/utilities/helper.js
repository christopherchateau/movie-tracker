export const movieCleaner = movies => {
  return movies.map(movie => {
    return {
      title: movie.title,
      date: movie.release_date,
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path,
      overview: movie.overview
    };
  });
};
