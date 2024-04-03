import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformedMovies = data.results.map((moviesData) => {
      return {
        id: moviesData.episode_id,
        title: moviesData.title,
        openingText: moviesData.opening_crawl,
        releaseDate: moviesData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

// We should not connect to database from the frontend itself because our database is exposed, anyone can query the data from our database, just by running a database query in browser console, which exposes other users data too. The biggest problem is the security problem of all.
// The ideal way to connect to databases is from the Backend App which is not running on the browser but running on some server out there or may be on the same server as the database often on a different server though. So the Backend App will do the talking to the database because we can safely store and use database credentials on the Backend App, since that backend code can't be viewed by users. It's on the different server and the users of the website will never see that code.

// 1. The default method type of fetch API is GET.

// 2. When I do fetch('https://swapi.dve/api/films') the default method type here is GET.
