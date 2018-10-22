import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from '../Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
