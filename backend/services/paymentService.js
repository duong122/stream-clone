const crypto = require('crypto');
const qs = require('qs');

// Cấu hình cố định cho môi trường sandbox
const VNPayConfig = {
  vnp_TmnCode: 'W51SLH6N',
  vnp_HashSecret: 'MGQN7PFIYAZ857KKE2EA9B1YRVT5VG6V',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_ReturnUrl: 'http://myphimvip1234567890.vn:3000/payment-success',
};

/**
 * Hàm sinh URL thanh toán VNPay
 * @param {Object} req - Request Express
 * @param {number} amount - Số tiền cần thanh toán (VND)
 * @param {string} orderInfo - Mô tả đơn hàng
 * @returns {string} paymentUrl
 */
exports.generateVNPayUrl = (req, amount, orderInfo = 'Thanh toan VIP') => {
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  const date = new Date();
  const createDate = date.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const orderId = Date.now().toString();

  const params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: VNPayConfig.vnp_TmnCode,
    vnp_Amount: amount * 100, // nhân 100
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'billpayment',
    vnp_Locale: 'vn',
    vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
    vnp_IpAddr: ipAddr === '::1' ? '127.0.0.1' : ipAddr,
    vnp_CreateDate: createDate,
    vnp_BankCode: 'NCB', // Bank giả lập ở sandbox
  };

  const sortedParams = sortObject(params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const secureHash = createSecureHash(signData, VNPayConfig.vnp_HashSecret);

  sortedParams.vnp_SecureHash = secureHash;

  const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(sortedParams, {
    encode: true,
  })}`;

  return paymentUrl;
};

// Sắp xếp object theo key
function sortObject(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

// Tạo hash SHA512
function createSecureHash(data, secret) {
  return crypto.createHmac('sha512', secret).update(data).digest('hex');
}
