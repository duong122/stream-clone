const paymentService = require('../services/paymentService');

exports.createVNPayPayment = (req, res) => {
  try {
    const amount = 1199900; // VND
    const paymentUrl = paymentService.generateVNPayUrl(req, amount);
    return res.status(200).json({ paymentUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi khi tạo link thanh toán' });
  }
};
