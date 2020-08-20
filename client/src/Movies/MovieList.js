import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies } = props
  const history = useHistory()

  return (
    <div className="movie-list">
      <button onClick={() => history.push(`/add-movie/`)}>Add Movie</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard getMovieList={props.getMovieList} movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
