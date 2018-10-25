export const fetchData = async () => {
  const url = "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76"
  const response = await fetch(url);
  const movieData = await response.json();
  return movieData;
};
