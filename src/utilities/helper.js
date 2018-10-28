import { fetchData } from "./fetch";

export const movieCleaner = async () => {
  const movies = await fetchData()
  return movies.crew
    .filter(movie => movie.job === "Director")
    .map( movie => ({
      title: movie.title,
      date: movie.release_date,
      poster:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      id: movie.id,
  }))
};


