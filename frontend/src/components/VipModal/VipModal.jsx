// VipModal.jsx
import React from 'react';
import { Modal, Button, Radio, Input, Checkbox } from 'antd';
import './VipModal.css';
import PaymentMethod from './PaymentMethod';
import { createVNPayUrl } from '../../services/paymentService'; 

const VipModal = ({ open, onClose }) => {
    const handleVipPayment = async () => {
        try {
          const paymentUrl = await createVNPayUrl();
          window.location.href = paymentUrl; 
        } catch (error) {
          console.error('Lỗi khi tạo thanh toán VNPay:', error);
        }
    }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      className="vip-modal"
    >
      <div className="vip-header">
        <img src="https://i.imgur.com/0y8Ftya.png" alt="avatar" className="avatar" />
        <div className="user-info">
          <h3>User7ed3e0ad4</h3>
          <p>Đăng ký VIP để trải nghiệm các nội dung tuyệt đỉnh</p>
        </div>
      </div>

      <div className="vip-plan-section">
        <div className="plan-box active">
          <h4>Cao cấp</h4>
          <p>Gói gia hạn năm</p>
          <h3>$119.99</h3>
        </div>
        <div className="plan-box">
          <h4>Tiêu chuẩn</h4>
          <p>Gói gia hạn năm</p>
          <h3>$89.99</h3>
        </div>
        <div className="plan-box small">
          <span className="badge">Ưu đãi cho thành viên mới</span>
          <h4>Cao cấp</h4>
          <p>Gói gia hạn tháng</p>
          <h3>$1.99 <del>$11.99</del></h3>
        </div>
        <div className="plan-box small">
          <span className="badge">Ưu đãi cho thành viên mới</span>
          <h4>Tiêu chuẩn</h4>
          <p>Gói gia hạn tháng</p>
          <h3>$1.99 <del>$8.99</del></h3>
        </div>
      </div>

      <PaymentMethod onVNPayCheckout={() => console.log('VNPay Checkout')} />

      <div className="vip-actions">
        <Checkbox>Tôi đồng ý <a href="#">Thỏa thuận dịch vụ VIP</a></Checkbox>
        <Button type="primary" block style={{ marginTop: 10 }} onClick={handleVipPayment}>
          Gia nhập VIP - $119.99
        </Button>
      </div>
    </Modal>
  );
};

export default VipModal;
