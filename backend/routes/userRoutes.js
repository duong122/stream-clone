const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Đăng ký
router.post("/register", userController.register);

// Đăng nhập
router.post("/login", userController.login);    

// Admin - CRUD user
router.get("/", userController.getAllUsers);          // Lấy danh sách
router.get("/:id", userController.getUserById);       // Lấy chi tiết
router.put("/:id", userController.updateUser);        // Cập nhật
router.delete("/:id", userController.deleteUser);     // Xóa


module.exports = router;
