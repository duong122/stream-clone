import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Slide from './Slide';
import SliderNavigation from './SliderNavigation';
import { getMovies } from '../../services/movieService';
import './MovieSlider.css';

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMovies();
        console.log('Fetched movies:', data);
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Transition speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set interval to 5 seconds (5000ms)
    pauseOnHover: true, // Pause autoplay when hovering over the slider
    pauseOnDotsHover: true, // Pause autoplay when hovering over the dots
    pauseOnFocus: true, // Pause autoplay when the slider is focused (e.g., clicking arrows)
  };

  if (loading) {
    return (
      <div className="container-fluid p-0 position-relative d-flex justify-content-center align-items-center" style={{ height: '550px' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-0 position-relative d-flex justify-content-center align-items-center text-white" style={{ height: '550px' }}>
        <p>{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="container-fluid p-0 position-relative d-flex justify-content-center align-items-center text-white" style={{ height: '550px' }}>
        <p>No movies available.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 position-relative">
      <Slider ref={sliderRef} {...settings}>
        {movies.map((movie) => (
          <Slide key={movie._id} movie={movie} />
        ))}
      </Slider>
      <SliderNavigation
        currentSlide={currentSlide}
        totalSlides={movies.length}
        sliderRef={sliderRef}
      />
    </div>
  );
};

export default MovieSlider;