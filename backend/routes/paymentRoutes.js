const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/vnpay/create', paymentController.createVNPayPayment);

module.exports = router;
