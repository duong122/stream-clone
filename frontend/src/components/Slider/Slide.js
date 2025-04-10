import React from 'react';
import MovieInfo from './MovieInfo';
import './Slide.css';

const Slide = ({ movie }) => {
  return (
    <div className="slide">
      <div
        className="slide-background"
        style={{ backgroundImage: `url(${movie.image})` }}
      >
        <div className="slide-overlay d-flex align-items-center p-4">
          <MovieInfo movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default Slide;