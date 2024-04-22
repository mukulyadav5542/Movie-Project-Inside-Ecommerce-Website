import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [failApiCount, setFailApiCount] = useState(0);
  let timeoutId;

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        setFailApiCount((pre) => {
          console.log(pre);
          if (pre === -1) return -1;
          else return pre + 1;
        });
        throw new Error("Something went wrong ......Retrying");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((moviesData) => {
        return {
          timeoutId: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  useEffect(() => {
    // if (timeoutId) clearTimeout(timeoutId);
    if (failApiCount > 0) {
      timeoutId = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  }, [failApiCount]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading......</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button
          onClick={() => {
            fetchMoviesHandler();
          }}
        >
          Fetch Movies
        </button>
        {failApiCount !== 0 && (
          <button
            onClick={() => {
              setFailApiCount(-1);
              setError(true);
            }}
          >
            Cancel
          </button>
        )}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

