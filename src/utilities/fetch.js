import { movieCleaner } from "./helper";

export const fetchData = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76"
  );
  const movieData = await response.json();
  const directedMovies = movieData.crew.filter(
    movie => movie.job === "Director"
  );
  return movieCleaner(directedMovies)
};