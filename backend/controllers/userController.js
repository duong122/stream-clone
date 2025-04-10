const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.JWT_SECRET || "your_jwt_secret", 
        { expiresIn: "1d" }
    );
};

exports.register = async (req, res) => {
    try {
        const { username, password, fullName, email } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
        }

        const newUser = new User({ username, password, fullName, email });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error("LỖI ĐĂNG KÝ:", error);
        res.status(500).json({ message: "Đăng ký thất bại", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });

        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Đăng nhập thất bại", error });
    }
};

// Lấy danh sách tất cả người dùng (admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // bỏ mật khẩu
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Không thể lấy danh sách người dùng", error });
    }
};

// Lấy chi tiết 1 user
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Cập nhật user (admin)
exports.updateUser = async (req, res) => {
    try {
        const { username, fullName, email, isAdmin } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, fullName, email, isAdmin },
            { new: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json({ message: "Cập nhật thành công", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhật", error });
    }
};

// Xóa user (admin)
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa", error });
    }
};


