// controllers/directorController.js
const Director = require('../models/directorModel');

exports.getAllDirectors = async (req, res) => {
    try {
        const directors = await Director.find().populate('movies');
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDirector = async (req, res) => {
    const { name, birthDate, nationality, movies } = req.body;
    try {
        const newDirector = new Director({ name, birthDate, nationality, movies });
        await newDirector.save();
        res.status(201).json(newDirector);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single director by ID
exports.getDirectorById = async (req, res) => {
    const { id } = req.params;
    try {
        const director = await Director.findById(id).populate('movies');
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a director by ID
exports.updateDirector = async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, nationality, movies } = req.body;
    try {
        const updatedDirector = await Director.findByIdAndUpdate(
            id,
            { name, birthDate, nationality, movies },
            { new: true, runValidators: true }
        );
        if (!updatedDirector) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.status(200).json(updatedDirector);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a director by ID
exports.deleteDirector = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDirector = await Director.findByIdAndDelete(id);
        if (!deletedDirector) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.status(200).json({ message: 'Director deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};