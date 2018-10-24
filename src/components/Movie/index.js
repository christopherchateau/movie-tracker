import React from 'react';
import PropTypes from "prop-types";
import './Movie.css'

const Movie = (props) => {
  return (
    <div className="Movie">
      <h1>{props.title}</h1>
      <p>{props.overview}</p>
      <p>{props.release_date}</p>

    </div>
  )
}

export default Movie