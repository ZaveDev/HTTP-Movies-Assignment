import React from 'react';
import axios from 'axios';



const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;
  console.log(props);

  const deleteMovie = (e) => {
    e.preventDefault()
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res);
      props.getMovieList()
    })
    .catch(err => {console.log(err);})
  }

  return (
    <>
      <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
      <button onClick={deleteMovie}>X</button>
    </>
  );
};

export default MovieCard;
