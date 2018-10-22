import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from '../Header'
import LoginControls from '../LoginControls'
import MovieContainer from '../MovieContainer'
import './App.css';

class App extends Component {
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
