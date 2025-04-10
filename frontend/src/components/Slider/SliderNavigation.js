import React from 'react';
import './SliderNavigation.css';

const SliderNavigation = ({ currentSlide, totalSlides, sliderRef }) => {
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="slider-navigation position-absolute top-50 w-100 d-flex justify-content-between">
      <button
        className="btn btn-dark btn-lg"
        onClick={goToPrev}
        disabled={currentSlide === 0}
      >
        ←
      </button>
      <button
        className="btn btn-dark btn-lg"
        onClick={goToNext}
        disabled={currentSlide === totalSlides - 1}
      >
        →
      </button>
    </div>
  );
};

export default SliderNavigation;