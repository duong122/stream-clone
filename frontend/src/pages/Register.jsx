import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", fullName: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await registerUser(form);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    } catch (err) {
      alert("Đăng ký thất bại");
      console.error(err);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center text-white"
         style={{ background: "url('/assets/img/login_image.jpg') no-repeat center center/cover" }}>
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
      <div className="position-relative bg-black p-5 rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input name="username" type="text" className="form-control bg-secondary text-white" placeholder="Tên đăng nhập" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input name="fullName" type="text" className="form-control bg-secondary text-white" placeholder="Họ và tên" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input name="email" type="email" className="form-control bg-secondary text-white" placeholder="Email" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input name="password" type="password" className="form-control bg-secondary text-white" placeholder="Mật khẩu" required onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Đăng Ký</button>
        </form>
        <p className="text-center mt-3">
          Đã có tài khoản? <a href="/login" className="text-warning">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
}
