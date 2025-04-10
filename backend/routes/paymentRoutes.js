const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');

router.get('/', controller.renderOrderList);
router.get('/create_payment_url', controller.renderCreatePayment);
router.get('/querydr', controller.renderQueryDR);
router.get('/refund', controller.renderRefund);

router.post('/create_payment_url', controller.createPaymentUrl);
router.get('/vnpay_return', controller.vnpayReturn);
router.get('/vnpay_ipn', controller.vnpayIpn);
router.post('/querydr', controller.queryTransaction);
router.post('/refund', controller.refundTransaction);

module.exports = router;

