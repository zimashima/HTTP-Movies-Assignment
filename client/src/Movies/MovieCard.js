import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="card p-4 m-3 justify-content-center">
      <h2 className="card-title">{title}</h2>
      <div className="movie-director card-text">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore card-text">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star card-text">
          {star}
        </div>
      ))}

      
    </div>
  );
};

export default MovieCard;
