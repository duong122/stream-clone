// controllers/movieController.js
const Movie = require('../models/movieModel');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('category studio director actors');
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMovie = async (req, res) => {
    const { title, description, releaseDate, duration, category, studio, director, actors, image, video } = req.body;
    try {
        const newMovie = new Movie({ title, description, releaseDate, duration, category, studio, director, actors, image, video});
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id).populate('category studio director actors');
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};