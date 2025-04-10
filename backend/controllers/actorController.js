// controllers/actorController.js
const Actor = require('../models/actorModel');

exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find().populate('movies');
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createActor = async (req, res) => {
    const { name, birthDate, nationality, movies, image } = req.body;
    try {
        const newActor = new Actor({ name, birthDate, nationality, movies, image });
        await newActor.save();
        res.status(201).json(newActor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single actor by ID
exports.getActorById = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await Actor.findById(id).populate('movies');
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an actor by ID
exports.updateActor = async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, nationality, movies, image } = req.body;
    try {
        const updatedActor = await Actor.findByIdAndUpdate(
            id,
            { name, birthDate, nationality, movies, image },
            { new: true, runValidators: true }
        );
        if (!updatedActor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.status(200).json(updatedActor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an actor by ID
exports.deleteActor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedActor = await Actor.findByIdAndDelete(id);
        if (!deletedActor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.status(200).json({ message: 'Actor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};