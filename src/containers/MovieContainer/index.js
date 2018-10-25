import React from "react";
import Movie from "../../components/Movie";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import spinner from "../../images/circle-loader.gif";
import "./MovieContainer.css";

export const MovieContainer = props => {
  const cards = props.movies.map(movie => {
    return <Movie {...movie} key={movie.title} />;
  });

  return (
    <div className="Movie-Container">
      {cards.length ? cards : <img className="spinner" src={spinner} />}
    </div>
  );
};

export const mapStateToProps = state => {
  return { movies: state.movies };
};

export default connect(mapStateToProps)(MovieContainer);
