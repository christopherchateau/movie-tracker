import React from "react";
import Movie from "../../components/Movie";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import spinner from "../../images/circle-loader.gif";
import "./MovieContainer.css";

export const MovieContainer = props => {
  let moviesToDisplay = [...props.movies];
  if (props.showFavorites) {
    moviesToDisplay = moviesToDisplay.filter(movie => movie.favorited);
  }
  const cards = moviesToDisplay.map(movie => {
    return <Movie {...movie} key={movie.title} />;
  });

  return (
    <div className="Movie-Container">
      {cards.length ? cards : <img className="spinner" src={spinner} />}
    </div>
  );
};

export const mapStateToProps = state => ({
  movies: state.movies,
  showFavorites: state.showFavorites
});

export default connect(mapStateToProps)(MovieContainer);
