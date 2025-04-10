import React, { useEffect, useState } from "react";
import { getStudios, addStudio, updateStudio, deleteStudio } from "../../services/studioService";
import "bootstrap/dist/css/bootstrap.min.css";

const Studios = () => {
    const [studios, setStudios] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [editingStudio, setEditingStudio] = useState(null);

    useEffect(() => {
        loadStudios();
    }, []);

    const loadStudios = async () => {
        const data = await getStudios();
        setStudios(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studioData = { name, address, contactInfo };
        if (editingStudio) {
            await updateStudio(editingStudio._id, studioData);
        } else {
            await addStudio(studioData);
        }
        loadStudios();
        resetForm();
    };

    const handleEdit = (studio) => {
        setName(studio.name);
        setAddress(studio.address || "");
        setContactInfo(studio.contactInfo || "");
        setEditingStudio(studio);
    };

    const handleDelete = async (id) => {
        await deleteStudio(id);
        loadStudios();
    };

    const resetForm = () => {
        setName("");
        setAddress("");
        setContactInfo("");
        setEditingStudio(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý hãng sản xuất</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">Tên hãng sản xuất</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên hãng sản xuất"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Thông tin liên lạc</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập thông tin liên lạc"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editingStudio ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingStudio && (
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
                        <th>Tên hãng sản xuất</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin liên lạc</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {studios.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">Chưa có hãng sản xuất nào</td>
                        </tr>
                    ) : (
                        studios.map((studio, index) => (
                            <tr key={studio._id}>
                                <td>{index + 1}</td>
                                <td>{studio.name}</td>
                                <td>{studio.address || "N/A"}</td>
                                <td>{studio.contactInfo || "N/A"}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(studio)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(studio._id)}>
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

export default Studios;
