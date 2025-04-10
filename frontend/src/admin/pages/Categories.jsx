import React, { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import "bootstrap/dist/css/bootstrap.min.css";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryData = { name, description };
        if (editingCategory) {
            await updateCategory(editingCategory._id, categoryData);
        } else {
            await addCategory(categoryData);
        }
        loadCategories();
        resetForm();
    };

    const handleEdit = (category) => {
        setName(category.name);
        setDescription(category.description || "");
        setEditingCategory(category);
    };

    const handleDelete = async (id) => {
        await deleteCategory(id);
        loadCategories();
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setEditingCategory(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý thể loại</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Tên thể loại</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên thể loại"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mô tả</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập mô tả"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editingCategory ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingCategory && (
                        <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                            Hủy
                        </button>
                    )}
                </div>
            </form>

            <table className="table table-bordered shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Tên thể loại</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">Chưa có thể loại nào</td>
                        </tr>
                    ) : (
                        categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description || "N/A"}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(category)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category._id)}>
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

export default Categories;
