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
    this.setState({ isClicked });
  };

  render() {
    let cardContents;
    let { title, overview, date, poster } = this.props;

    let year = "/" + date.split("-")[0];
    date = date
      .split("-")
      .slice(1)
      .join("/");

    if (!this.state.isClicked) {
      cardContents = (
        <img className="movie-poster" src={poster} alt="Movie Poster" />
      );
    } else {
      cardContents = (
        <div className="movie-details">
          <article className="text-wrapper">
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
      <div onMouseEnter={this.handleCardClick} 
      onMouseLeave={this.handleCardClick}
      className="Movie">
        {cardContents}
      </div>
    );
  }
}

export default Movie;
