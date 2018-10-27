import React, { Component } from "react";
import Header from "../../components/Header";
import LoginControls from "../../containers/LoginControls";
import NavBar from "../NavBar";
import MovieContainer from "../MovieContainer";
import { loadMovies } from "../../actions";
import { movieCleaner } from "../../utilities/helper";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import "./App.css";

export class App extends Component {
  
  componentDidMount = async () => {
    const data = await movieCleaner();
    this.props.loadMovies(data);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={NavBar} />
        <Route exact path="/login" component={LoginControls} />
        <Route exact path="/signup" component={LoginControls} />
        <MovieContainer />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loadMovies: movies => dispatch(loadMovies(movies))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
