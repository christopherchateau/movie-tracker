import React from "react";
import Movie from "../../containers/Movie";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import spinner from "../../images/circle-loader.gif";
import walter from "../../images/walter.jpg";
import "./MovieContainer.css";

export const MovieContainer = props => {
  let moviesToDisplay = [...props.movies];

  if (props.showFavorites) {
    moviesToDisplay = moviesToDisplay.filter(movie => movie.favorited);
  }

  if (props.showFavorites && !moviesToDisplay.length) {
    return (
      <div className="Movie-Container no-favs">
        <img className="walter" alt="Walter Sobchak" src={walter} />
        <h3>{`You're entering a world of pain, ${
          props.userName
        }. Pick some favorites!`}</h3>
      </div>
    );
  } else {
    const cards = moviesToDisplay.map(movie => {
      return <Movie {...movie} key={movie.title} />;
    });
    return (
      <div className="Movie-Container">
        {cards.length ? (
          cards
        ) : (
          <img className="spinner" alt="loading content" src={spinner} />
        )}
      </div>
    );
  }
};

export const mapStateToProps = state => ({
  movies: state.movies,
  showFavorites: state.showFavorites,
  userName: state.currentUser.name
});

export default connect(mapStateToProps)(MovieContainer);

MovieContainer.propTypes = {
  movies: PropTypes.array.isRequired,
  showFavorites: PropTypes.bool.isRequired,
  userName: PropTypes.string
};
