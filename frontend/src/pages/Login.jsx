import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ username, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/"); // chuyển về trang chủ
    } catch (err) {
      alert("Đăng nhập thất bại");
      console.error(err);
    }
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
              type="text"
              className="form-control bg-secondary text-white"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          Bạn mới tham gia? <a href="/register" className="text-warning">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}
