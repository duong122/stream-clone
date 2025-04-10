// controllers/studioController.js
const Studio = require('../models/studioModel');

exports.getAllStudios = async (req, res) => {
    try {
        const studios = await Studio.find();
        res.status(200).json(studios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createStudio = async (req, res) => {
    const { name, address, contactInfo } = req.body;
    try {
        const newStudio = new Studio({ name, address, contactInfo });
        await newStudio.save();
        res.status(201).json(newStudio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single studio by ID
exports.getStudioById = async (req, res) => {
    const { id } = req.params;
    try {
        const studio = await Studio.findById(id);
        if (!studio) {
            return res.status(404).json({ message: 'Studio not found' });
        }
        res.status(200).json(studio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a studio by ID
exports.updateStudio = async (req, res) => {
    const { id } = req.params;
    const { name, address, contactInfo } = req.body;
    try {
        const updatedStudio = await Studio.findByIdAndUpdate(
            id,
            { name, address, contactInfo },
            { new: true, runValidators: true }
        );
        if (!updatedStudio) {
            return res.status(404).json({ message: 'Studio not found' });
        }
        res.status(200).json(updatedStudio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a studio by ID
exports.deleteStudio = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudio = await Studio.findByIdAndDelete(id);
        if (!deletedStudio) {
            return res.status(404).json({ message: 'Studio not found' });
        }
        res.status(200).json({ message: 'Studio deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
