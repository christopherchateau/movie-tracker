import React from "react";
import Movie from "../Movie";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import spinner from "../../images/circle-loader.gif";
import "./MovieContainer.css";

const MovieContainer = props => {
  const cards = props.movies.map(movie => {
    return <Movie {...movie} key={movie.title} />;
  });

  return (
    <div className="Movie-Container">
      {cards.length ? cards : <img className="spinner" src={spinner} />}
    </div>
  );
};

const mapStateToProps = state => {
  return { movies: state.movies };
};

export default connect(mapStateToProps)(MovieContainer);
