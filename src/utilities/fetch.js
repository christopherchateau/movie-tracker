import apiKey from '../apiKey'

export const fetchData = async () => {
  const url = `https://api.themoviedb.org/3/person/1223/movie_credits?api_key=${apiKey.theMoveDBApiKey}`
  const response = await fetch(url);
  const movieData = await response.json();
  return movieData
};
