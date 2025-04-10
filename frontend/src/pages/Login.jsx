import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Đăng nhập với:", email, password);
    navigate("/"); // Chuyển về trang chủ sau khi đăng nhập
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center text-white"
      style={{
        background: "url('/assets/img/login_image.jpg') no-repeat center center/cover",
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

      <div className="position-relative bg-black p-5 rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-secondary text-white"
              placeholder="Email hoặc số điện thoại"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control bg-secondary text-white"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Đăng Nhập</button>
        </form>
        <p className="text-center mt-3">
          Bạn mới tham gia? <a href="#" className="text-warning">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}
