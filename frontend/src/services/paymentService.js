// services/paymentService.js
import axios from 'axios';
const API_URL = "http://localhost:5000/payment";

export const createVNPayUrl = async () => {
  const response = await axios.post(API_URL + "/vnpay/create");
  return response.data.paymentUrl;
};
