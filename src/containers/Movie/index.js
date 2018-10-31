import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { connect } from "react-redux";
import { toggleFavorite, setErrorMessage } from "../../actions";
import * as fetch from "../../utilities/fetch.js";

export class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  handleClickFavorite = () => {
    const {
      favorited,
      id,
      handleToggleFavorite,
      handleErrorMessage
    } = this.props;
    if (!this.verifyUserIsLoggedIn()) {
      handleErrorMessage("Please log in or sign up to select favorites");
      return;
    }

    handleToggleFavorite(id);
    if (!favorited) {
      try {
        fetch.fetchAddFavorite(this.props);
      } catch (error) {}
    } else {
      fetch.removeFavorite(this.props.currentUser.id, id);
    }
  };

  handleHover = bool => {
    const isHovered = bool;
    this.setState({ isHovered });
  };

  verifyUserIsLoggedIn = () => {
    return this.props.loggedIn;
  };

  render() {
    let { title, overview, date, poster, favorited } = this.props;
    let cardContents;

    let year = "/" + date.split("-")[0];
    date = date
      .split("-")
      .slice(1)
      .join("/");

    if (!this.state.isHovered) {
      cardContents = (
        <div>
          <i className={"fa-star" + (favorited ? " fas favorited" : " far")} />
          <img className="movie-poster" src={poster} alt="Movie Poster" />
        </div>
      );
    } else {
      cardContents = (
        <div className="movie-details">
          <article className="text-wrapper">
            <i
              className={"fa-star" + (favorited ? " fas favorited" : " far")}
              onClick={this.handleClickFavorite}
            />
            <h1 className="movie-title">{title}</h1>
            <p className="movie-date">
              {date}
              {year}
            </p>
            <p className="movie-overview">{overview}</p>
          </article>
        </div>
      );
    }
    return (
      <div
        onMouseLeave={() => this.handleHover(false)}
        onMouseEnter={() => this.handleHover(true)}
        className="Movie"
      >
        {cardContents}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  loggedIn: state.loggedIn
});

export const mapDispatchToProps = dispatch => ({
  handleToggleFavorite: id => dispatch(toggleFavorite(id)),
  handleErrorMessage: message => dispatch(setErrorMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  handleToggleFavorite: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired
};
