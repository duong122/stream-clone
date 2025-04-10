// services/paymentService.js
import axios from 'axios';
const API_URL = "http://localhost:5000/payment";

const PaymentService = {
  // Gửi yêu cầu tạo URL thanh toán
  createPaymentUrl: (data) => {
    return axios.post('/payment/create_payment_url', data);
  },

  // Gửi truy vấn trạng thái giao dịch
  queryTransaction: (data) => {
    return axios.post('/payment/querydr', data);
  },

  // Gửi yêu cầu hoàn tiền
  refundTransaction: (data) => {
    return axios.post('/payment/refund', data);
  },

  // Nhận kết quả redirect từ VNPay (gọi phía server, không dùng trên client)
  getVnpayReturn: (params) => {
    return axios.get('/payment/vnpay_return', { params });
  },

  // Nhận IPN từ VNPay (cũng gọi phía server, không dùng trên client)
  getVnpayIpn: (params) => {
    return axios.get('/payment/vnpay_ipn', { params });
  },

  // Render các trang phía backend (chỉ dùng nếu gọi HTML trực tiếp, thường không dùng frontend gọi)
  renderOrderList: () => {
    return axios.get('/payment/');
  },
  renderCreatePayment: () => {
    return axios.get('/payment/create_payment_url');
  },
  renderQueryDR: () => {
    return axios.get('/payment/querydr');
  },
  renderRefund: () => {
    return axios.get('/payment/refund');
  }
};

export default PaymentService;

