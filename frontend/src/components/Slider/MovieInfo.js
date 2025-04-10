import React from 'react';
import './MovieInfo.css';

const MovieInfo = ({ movie }) => {
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  return (
    <div className="movie-info text-white">
      <h1 className="display-4 text-uppercase mb-3">{movie.title}</h1>
      <div className="d-flex gap-3 mb-3">
        <span className="badge bg-warning text-dark">⭐ {movie.ratings.toFixed(1)}</span>
        <span className="badge bg-secondary">{releaseYear}</span>
        <span className="badge bg-secondary">{movie.duration} min</span>
        <span className="badge bg-secondary">{movie.category.name}</span>
      </div>
      <div className="mb-3">
        <p className="mb-1"><strong>Studio:</strong> {movie.studio.name}</p>
        <p className="mb-1"><strong>Director:</strong> {movie.director.name}</p>
        <p className="mb-1"><strong>Actors:</strong> {movie.actors.map(actor => actor.name).join(', ')}</p>
      </div>
      <p className="lead mb-4">{movie.description}</p>
      <button className="btn btn-danger btn-lg">▶ Play</button>
    </div>
  );
};

export default MovieInfo;