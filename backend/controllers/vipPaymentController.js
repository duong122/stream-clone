// controllers/vipPaymentController.js
const VIPPayment = require('../models/vipPaymentModel');

exports.getAllVIPPayments = async (req, res) => {
    try {
        const payments = await VIPPayment.find().populate('user');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVIPPayment = async (req, res) => {
    const { user, amount, paymentStatus } = req.body;
    try {
        const newPayment = new VIPPayment({ user, amount, paymentStatus });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single VIP payment by ID
exports.getVIPPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await VIPPayment.findById(id).populate('user');
        if (!payment) {
            return res.status(404).json({ message: 'VIP Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a VIP payment by ID
exports.updateVIPPayment = async (req, res) => {
    const { id } = req.params;
    const { user, amount, paymentStatus } = req.body;
    try {
        const updatedPayment = await VIPPayment.findByIdAndUpdate(
            id,
            { user, amount, paymentStatus },
            { new: true, runValidators: true }
        );
        if (!updatedPayment) {
            return res.status(404).json({ message: 'VIP Payment not found' });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a VIP payment by ID
exports.deleteVIPPayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayment = await VIPPayment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'VIP Payment not found' });
        }
        res.status(200).json({ message: 'VIP Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
