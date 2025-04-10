// controllers/revenueController.js
const Revenue = require('../models/revenueModel');

exports.getAllRevenues = async (req, res) => {
    try {
        const revenues = await Revenue.find();
        res.status(200).json(revenues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRevenue = async (req, res) => {
    const { movie, amount, date } = req.body;
    try {
        const newRevenue = new Revenue({ movie, amount, date });
        await newRevenue.save();
        res.status(201).json(newRevenue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single revenue by ID
exports.getRevenueById = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Revenue.findById(id);
        if (!revenue) {
            return res.status(404).json({ message: 'Revenue not found' });
        }
        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a revenue by ID
exports.updateRevenue = async (req, res) => {
    const { id } = req.params;
    const { movie, amount, date } = req.body;
    try {
        const updatedRevenue = await Revenue.findByIdAndUpdate(
            id,
            { movie, amount, date },
            { new: true, runValidators: true }
        );
        if (!updatedRevenue) {
            return res.status(404).json({ message: 'Revenue not found' });
        }
        res.status(200).json(updatedRevenue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a revenue by ID
exports.deleteRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRevenue = await Revenue.findByIdAndDelete(id);
        if (!deletedRevenue) {
            return res.status(404).json({ message: 'Revenue not found' });
        }
        res.status(200).json({ message: 'Revenue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
