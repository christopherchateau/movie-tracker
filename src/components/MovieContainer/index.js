import React from "react";
import Movie from "../Movie";
import PropTypes from "prop-types";
import "./MovieContainer.css";
import { connect } from 'react-redux'

const MovieContainer = (props) => {


  const cards = props.movies.map( movie => {
    return <Movie {...movie} key={movie.title} />
  })


  return (
    <div className="Movie-Container">
      {cards}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.movies)
  return {movies: state.movies}
}


export default connect(mapStateToProps)(MovieContainer)

