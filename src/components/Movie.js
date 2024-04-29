import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  console.log(props, "Movies");
  return (
    <li className={classes.movie} key={props.id}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => props.deleteMovie(props.id)}>Delete Movie</button>
    </li>
  );
};

export default Movie;
