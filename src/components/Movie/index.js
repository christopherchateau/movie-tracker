import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { connect } from "react-redux";
import { toggleFavorite } from "../../actions";
import * as fetch from "../../utilities/fetch.js";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleCardClick = async () => {
    const { favorited, id, handleFavoriteToggle } = this.props;
    console.log(id);
    handleFavoriteToggle(id);
    //console.log(this.props)
    if (!favorited) {
      try {
        const addFavorite = await fetch.fetchAddFavorite(this.props);
      } catch (error) {
        //console.log(error);
      }
    } else {
      console.log("already favorited");
    }
  };

  render() {
    let cardContents;
    let { title, overview, date, poster, favorited } = this.props;

    let year = "/" + date.split("-")[0];
    date = date
      .split("-")
      .slice(1)
      .join("/");

    if (!this.state.isClicked) {
      cardContents = (
        <div>
          <i
            className={"far fa-star" + (favorited ? " favorited" : "")}
            onClick={this.handleCardClick}
          />
          <img className="movie-poster" src={poster} alt="Movie Poster" />
        </div>
      );
    } else {
      cardContents = (
        <div className="movie-details">
          <article className="text-wrapper">
            <i className="far fa-star" onClick={this.handleCardClick} />
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
    return <div className="Movie">{cardContents}</div>;
  }
}

export const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export const mapDispatchToProps = dispatch => ({
  handleFavoriteToggle: (id) => dispatch(toggleFavorite(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
