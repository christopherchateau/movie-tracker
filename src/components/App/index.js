import React, { Component } from "react";
import Header from "../Header";
import LoginControls from "../LoginControls";
import NavBar from "../NavBar";
import MovieContainer from "../MovieContainer";
import { loadMovies } from "../../actions";
import { fetchData } from "../../utilities/fetch";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  componentDidMount = async () => {
    const data = await fetchData();
    this.props.handleFetch(data);
  };

  render() {
    return (
      <div className="App">
        <header class="header-controls">
          <Header />
          <Route exact path="/" component={NavBar} />
          <Route exact path="/login" component={LoginControls} />
        </header>
        <MovieContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleFetch: movies => dispatch(loadMovies(movies))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
