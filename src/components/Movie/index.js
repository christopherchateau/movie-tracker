import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }


  handleCardClick = () => {
    const isClicked = !this.state.isClicked;
    this.setState({ isClicked })
  }

  render() {
    const { title, overview, date, poster } = this.props;
    let cardContents;

    if (!this.state.isClicked) {
      cardContents = (
        <img className="movie-poster" src={poster} alt="Movie Poster" />
      );
    } else {
      cardContents = (
        <div className="movie-details">
          <h1 className="movie-title">{title}</h1>
          <p className="movie-date">{date}</p>
          <p className="movie-overview">{overview}</p>
        </div>
      );
    }
    return <div onClick={this.handleCardClick} className="Movie">{cardContents}</div>;
  }
}

export default Movie;
