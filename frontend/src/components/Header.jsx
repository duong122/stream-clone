import { useEffect, useState } from "react";
import { Search, Clock, Globe, Download, LogIn } from "lucide-react";
import { getCategories } from "../services/categoryService";
import { useNavigate } from 'react-router-dom';
import MenuItem from "./MenuItem";
import "bootstrap/dist/css/bootstrap.min.css";
import VipModal from "./VipModal/VipModal";

export default function Header() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy category:", error);
      }
    };
    fetchCategories();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed-top w-100 px-4 py-2 d-flex justify-content-between align-items-center bg-black ">
      {/* Logo và Navigation */}
      <div className="d-flex align-items-center gap-4">
        <div className="text-success fw-bold fs-3">Đại Việt</div>
        <div className="d-flex align-items-center gap-3 fs-6">
          <a href="#" className="text-decoration-none text-white">Đề xuất</a>
          <a href="#" className="text-decoration-none text-white">Good Day</a>

          {/* Dropdown Khác */}
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle text-white d-flex align-items-center gap-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              Khác 
            </button>
            <ul className="dropdown-menu bg-dark border-0 shadow">
              {categories.map((cat) => (
                <MenuItem key={cat.id} id={cat.id} name={cat.name} />
              ))}
              {categories.length === 0 && (
                <li><span className="dropdown-item text-muted">Không có dữ liệu</span></li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="d-flex align-items-center gap-5 text-white">
        <div className="d-flex align-items-center bg-secondary px-3 py-1 rounded">
          <input
            type="text"
            placeholder="Mạn Thành"
            className="bg-transparent border-0 text-white form-control-sm opacity-50"
          />
          <Search className="w-4 h-4 opacity-50" />
        </div>
        <Clock className="w-4 h-4 cursor-pointer" />
        <Globe className="w-4 h-4 cursor-pointer" />
        <Download className="w-4 h-4 opacity-50 cursor-pointer" />
        <button className="btn btn-warning fw-bold position-relative px-3 py-1" onClick={() => setIsModalVisible(true)}>
          VIP
          <span
            className="position-absolute top-0 start-100 translate-middle badge bg-danger text-white"
            style={{
              fontSize: "10px",
              padding: "2px 4px",
              maxWidth: "60px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Khuyến mãi
          </span>
        </button>

        <VipModal open={isModalVisible} onClose={() => setIsModalVisible(false)} />

        {/* Nếu đã đăng nhập */}
        {user ? (
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://i.imgur.com/0y8Ftya.png"
              alt="avatar"
              width="35"
              height="35"
              className="rounded-circle"
            />
            <span className="fw-bold">{user.username}</span>
            <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-outline-light d-flex align-items-center gap-2"
            onClick={() => navigate('/login')}
          >
            <LogIn className="w-4 h-3" /> Đăng Nhập
          </button>
        )}
      </div>
    </header>
  );
}
