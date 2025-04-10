import React, { useEffect, useState } from "react";
import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} from "../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, fullName, email, isAdmin };

        if (!editingUser) userData.password = password;

        try {
            if (editingUser) {
                await updateUser(editingUser._id, userData);
            } else {
                await addUser(userData);
            }
            loadUsers();
            resetForm();
        } catch (error) {
            alert("Lỗi xử lý user: " + error.message);
        }
    };

    const handleEdit = (user) => {
        setUsername(user.username);
        setFullName(user.fullName || "");
        setEmail(user.email || "");
        setIsAdmin(user.isAdmin || false);
        setEditingUser(user);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
            await deleteUser(id);
            loadUsers();
        }
    };

    const resetForm = () => {
        setUsername("");
        setFullName("");
        setEmail("");
        setPassword("");
        setIsAdmin(false);
        setEditingUser(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý tài khoản người dùng</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Họ tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {!editingUser && (
                        <div className="col-md-3">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="col-md-3">
                        <label className="form-label">Admin?</label>
                        <select
                            className="form-control"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.value === "true")}
                        >
                            <option value={false}>Không</option>
                            <option value={true}>Có</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editingUser ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingUser && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={resetForm}
                        >
                            Hủy
                        </button>
                    )}
                </div>
            </form>

            <table className="table table-bordered shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Admin?</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Chưa có người dùng nào
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.fullName || "N/A"}</td>
                                <td>{user.email || "N/A"}</td>
                                <td>{user.isAdmin ? "✔️" : "❌"}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default User;
