import { Route, Routes, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  VideoCameraOutlined,
  TagsOutlined,
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  CommentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import Categories from "./pages/Categories";
import Studios from "./pages/Studios";
import Actors from "./pages/Actors";
import Directors from "./pages/Directors";
import Revenues from "./pages/Revenues";
import Comments from "./pages/Comments";
import VIPPayments from "./pages/VIPPayments";
import Users from "./pages/Users";
import { getActors } from "../services/actorService";


const { Header, Sider, Content } = Layout;

function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      const data = await getActors();
      setActors(data);
    };
    fetchActors();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo text-white text-center py-3 fs-4">Admin Panel</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <NavLink to="/admin">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="movies" icon={<VideoCameraOutlined />}>
            <NavLink to="/admin/movies">Movies</NavLink>
          </Menu.Item>
          <Menu.Item key="categories" icon={<TagsOutlined />}>
            <NavLink to="/admin/categories">Categories</NavLink>
          </Menu.Item>
          <Menu.Item key="studios" icon={<DashboardOutlined />}>
            <NavLink to="/admin/studios">Studios</NavLink>
          </Menu.Item>
          <Menu.Item key="actors" icon={<UserOutlined />}>
            <NavLink to="/admin/actors">Actors</NavLink>
          </Menu.Item>
          <Menu.Item key="directors" icon={<StarOutlined />}>
            <NavLink to="/admin/directors">Directors</NavLink>
          </Menu.Item>
          <Menu.Item key="revenues" icon={<DollarOutlined />}>
            <NavLink to="/admin/revenues">Revenues</NavLink>
          </Menu.Item>
          <Menu.Item key="comments" icon={<CommentOutlined />}>
            <NavLink to="/admin/comments">Comments</NavLink>
          </Menu.Item>
          <Menu.Item key="vipPayments" icon={<DollarOutlined />}>
            <NavLink to="/admin/vip-payments">VIP Payments</NavLink>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <NavLink to="/admin/users">Users</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-black text-center fw-bold fs-4"></Header>
        <Content className="m-4">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="movies" element={<Movies />} />
            <Route path="categories" element={<Categories />} />
            <Route path="studios" element={<Studios />} />
            <Route path="actors" element={<Actors />} />
            <Route path="directors" element={<Directors />} />
            <Route path="revenues" element={<Revenues />} />
            <Route path="comments" element={<Comments />} />
            <Route path="vip-payments" element={<VIPPayments />} />
            <Route path="users" element={<Users />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminDashboard;
