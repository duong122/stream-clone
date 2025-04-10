import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import './CategorySlider.css';

const CategorySlider = ({ category, movies }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    className: 'movie-slider', // Add a custom class for styling
  };

  return (
    <div className="category-slider">
      <h2 className="category-title text-white">{category}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;