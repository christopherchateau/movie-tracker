import React, { Component } from "react";
import Header from "../../components/Header";
import LoginControls from "../../containers/LoginControls";
import NavBar from "../NavBar";
import MovieContainer from "../MovieContainer";
import { loadMovies, setErrorMessage } from "../../actions";
import { movieCleaner } from "../../utilities/helper";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
//       15,16,18,37 
export class App extends Component {
  
  componentDidMount = async () => {
    const { handleErrorMessage, handleFetch } = this.props;
    const data = await movieCleaner();
    if (!data.length) {
      handleErrorMessage("Ugh... movies failed to load");
    }
    handleFetch(data);
  };

  componentDidUpdate = () => {
    this.props.handleErrorMessage("");
  };

  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={NavBar} />
        <Route exact path="/login" component={LoginControls} />
        <Route exact path="/signup" component={LoginControls} />
        <Route exact path="/favorites" component={NavBar} />
        <MovieContainer />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  handleFetch: movies => dispatch(loadMovies(movies)),
  handleErrorMessage: message => dispatch(setErrorMessage(message))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
