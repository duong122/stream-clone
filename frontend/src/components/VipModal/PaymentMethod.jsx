import React, { useState } from 'react';
import { Radio, Input, Button } from 'antd';
import { CreditCard, Wallet } from 'lucide-react';


const PaymentMethod = () => {
  const [method, setMethod] = useState('vnpay');
  const [cardNumber, setCardNumber] = useState('');

  const handleVNPay = async () => {
    try {
      // const paymentUrl = await createVNPayUrl();
      // const redirectUrl = `/vnpay/redirect?paymentUrl=${encodeURIComponent(paymentUrl)}`;
      // window.location.href = redirectUrl;
    } catch (error) {
      console.error('VNPay Error:', error);
    }
  };

  return (
    <div className="payment-methods">
      <h4>Chọn phương thức thanh toán</h4>
      <Radio.Group
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        buttonStyle="solid"
      >
        <Radio.Button value="paypal">
          <Wallet size={14} /> PayPal
        </Radio.Button>
        <Radio.Button value="card">
          <CreditCard size={14} /> Thẻ ngân hàng
        </Radio.Button>
        <Radio.Button value="vnpay">
          <Wallet size={14} /> VNPay
        </Radio.Button>
      </Radio.Group>

      {method === 'card' && (
        <Input
          placeholder="Nhập số thẻ tín dụng của bạn"
          style={{ marginTop: 16 }}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      )}
    </div>
  );
};

export default PaymentMethod;
