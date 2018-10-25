import React from 'react';
import PropTypes from "prop-types";
import './Movie.css'

const Movie = (props) => {
  return (
    <div className="Movie">
      {/* <h1 className='movie-title'>{props.title}</h1> */}
      {/* <p className='movie-overview'>{props.overview}</p> */}
      {/* <p className='movie-date'>{props.date}</p> */}
      <img className='movie-poster' src={props.poster} alt="Movie Poster"/>
    </div>
  )
}

export default Movie