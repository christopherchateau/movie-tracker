import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { connect } from "react-redux";
import * as fetch from '../../utilities/fetch.js';
class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleCardClick = async () => {
   try {
   const addFavorite = await fetch.fetchAddFavorite(this.props)
   console.log(addFavorite)
    } catch (error) {
      console.log(error)
    }
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
        <div>
         <img className="movie-poster" src={poster} alt="Movie Poster" />
         <i className="far fa-star" 
            onClick={this.handleCardClick}>
         </i>
        </div>
      );
    } else {
      cardContents = (
        <div className="movie-details">
          <article className="text-wrapper">
           <i className="far fa-star" 
              onClick={this.handleCardClick}>
          </i>
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
      className="Movie">
        {cardContents}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(Movie);
