import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MovieSlider from '../components/Slider/MovieSlider';
import CategorySlider from '../components/Category/CategorySlider';
import { getMovies } from '../services/movieService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ActorList from '../components/Actor/ActorList';
import Footer from '../components/Footer/Footer';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movies = await getMovies(); // Fetch all movies

        // Group movies by category (assuming the API returns movies with a category field)
        const groupedByCategory = movies.reduce((acc, movie) => {
          const categoryName = movie.category.name;
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push({
            _id: movie._id,
            title: movie.title,
            image: movie.image,
          });
          return acc;
        }, {});

        // Convert grouped movies into an array of categories
        const categoryArray = Object.keys(groupedByCategory).map((category) => ({
          category,
          movies: groupedByCategory[category],
        }));

        setCategories(categoryArray);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#141414' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center text-white" style={{ height: '100vh', backgroundColor: '#141414' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: '#141414' }}>
      <Header />
      <MovieSlider />
      <div className="category-sliders">
        {categories.map((cat, index) => (
          <CategorySlider key={index} category={cat.category} movies={cat.movies} />
        ))}
      </div>
      <ActorList/>
      <Footer/>
    </div>
  );
}

export default HomePage;

