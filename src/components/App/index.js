import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from '../Header'
import LoginControls from '../LoginControls'
import MovieContainer from '../MovieContainer'
import './App.css';

class App extends Component {

  componentDidMount = async () => {
    const response = await fetch('https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76');
    const movieData = await response.json();
    const directedMovies = movieData.crew.filter(movie => movie.job === 'Director');
  }

  render() {
    return (
      <div className="App">
        <Header />
        <LoginControls />
        <MovieContainer />
      </div>
    );
  }
}

export default App;
