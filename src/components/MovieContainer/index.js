import React from "react";
import Movie from "../Movie";
import PropTypes from "prop-types";
import "./MovieContainer.css";
import { connect } from 'react-redux'

const MovieContainer = () => {

  return (
    <div className="Movie-Container">
      <Movie />

    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.movies)
  return {movies: state.movies}
}


export default connect(mapStateToProps)(MovieContainer)

