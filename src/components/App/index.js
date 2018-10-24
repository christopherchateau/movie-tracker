import React, { Component } from "react";
import Header from "../Header";
import LoginControls from "../LoginControls";
import MovieContainer from "../MovieContainer";
import { loadMovies } from "../../actions";
import { fetchData } from "../../utilities/fetch";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  componentDidMount = async () => {
    const data = await fetchData();
    this.props.handleFetch(data);
  };

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

const mapDispatchToProps = dispatch => ({
  handleFetch: movies => dispatch(loadMovies(movies))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
