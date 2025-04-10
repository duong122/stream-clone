import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-column">
        <h4>Giới thiệu về chúng tôi</h4>
        <p>Thông tin công ty</p>
        <p>Giới thiệu dịch vụ sản phẩm</p>
        <p>Cách xem</p>
        <p>Quan hệ nhà đầu tư</p>
      </div>
      <div className="footer-column">
        <h4>Hợp tác</h4>
        <p>Đăng quảng cáo</p>
        <p>Quan hệ kinh doanh</p>
        <p>Hợp tác cài đặt trước</p>
      </div>
      <div className="footer-column">
        <h4>Hỗ trợ và giúp đỡ</h4>
        <p>Phản ánh ý kiến</p>
        <p>Trung tâm phản hồi bảo mật</p>
        <p>Câu hỏi thường gặp</p>
      </div>
      <div className="footer-column">
        <h4>Điều khoản dịch vụ</h4>
        <p>Điều khoản quyền riêng tư</p>
        <p>Điều khoản sử dụng</p>
        <p>Thiết lập Cookies</p>
        <p>Do Not Sell or Share My Information</p>
      </div>
    </div>
  );
};

export default Footer;
