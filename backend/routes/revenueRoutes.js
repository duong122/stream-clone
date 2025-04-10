const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

// Route to get all revenues
router.get('/', revenueController.getAllRevenues);

// Route to create a new revenue
router.post('/', revenueController.createRevenue);

// Route to get a single revenue by ID
router.get('/:id', revenueController.getRevenueById);

// Route to update a revenue by ID
router.put('/:id', revenueController.updateRevenue);

// Route to delete a revenue by ID
router.delete('/:id', revenueController.deleteRevenue);

module.exports = router;