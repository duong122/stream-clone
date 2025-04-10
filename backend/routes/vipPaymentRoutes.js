const express = require('express');
const router = express.Router();
const vipPaymentController = require('../controllers/vipPaymentController');

// Route to get all VIP payments
router.get('/', vipPaymentController.getAllVIPPayments);

// Route to create a new VIP payment
router.post('/', vipPaymentController.createVIPPayment);

// Route to get a single VIP payment by ID
router.get('/:id', vipPaymentController.getVIPPaymentById);

// Route to update a VIP payment by ID
router.put('/:id', vipPaymentController.updateVIPPayment);

// Route to delete a VIP payment by ID
router.delete('/:id', vipPaymentController.deleteVIPPayment);

module.exports = router;