import React, { useEffect, useState } from "react";
import { getDirectors, addDirector, updateDirector, deleteDirector } from "../../services/directorService";
import { getMovies } from "../../services/movieService";
import "bootstrap/dist/css/bootstrap.min.css";

const Directors = () => {
    const [directors, setDirectors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [editingDirector, setEditingDirector] = useState(null);

    useEffect(() => {
        loadDirectors();
        loadMovies();
    }, []);

    const loadDirectors = async () => {
        const data = await getDirectors();
        setDirectors(data);
    };

    const loadMovies = async () => {
        const data = await getMovies();
        setMovies(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const directorData = { name, birthDate, nationality, movies: selectedMovies };
        if (editingDirector) {
            await updateDirector(editingDirector._id, directorData);
        } else {
            await addDirector(directorData);
        }
        loadDirectors();
        resetForm();
    };

    const handleEdit = (director) => {
        setName(director.name);
        setBirthDate(director.birthDate ? director.birthDate.split("T")[0] : "");
        setNationality(director.nationality || "");
        setSelectedMovies(director.movies.map(movie => movie._id));
        setEditingDirector(director);
    };

    const handleDelete = async (id) => {
        await deleteDirector(id);
        loadDirectors();
    };

    const resetForm = () => {
        setName("");
        setBirthDate("");
        setNationality("");
        setSelectedMovies([]);
        setEditingDirector(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý đạo diễn</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">Tên đạo diễn</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên đạo diễn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Ngày sinh</label>
                        <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Quốc tịch</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập quốc tịch"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="form-label">Bộ phim đã đạo diễn</label>
                    <select
                        multiple
                        className="form-control"
                        value={selectedMovies}
                        onChange={(e) =>
                            setSelectedMovies(
                                [...e.target.options].filter(o => o.selected).map(o => o.value)
                            )
                        }
                    >
                        {movies.map(movie => (
                            <option key={movie._id} value={movie._id}>{movie.title}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editingDirector ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingDirector && (
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
                        <th>Tên đạo diễn</th>
                        <th>Ngày sinh</th>
                        <th>Quốc tịch</th>
                        <th>Phim đã đạo diễn</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {directors.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">Chưa có đạo diễn nào</td>
                        </tr>
                    ) : (
                        directors.map((director, index) => (
                            <tr key={director._id}>
                                <td>{index + 1}</td>
                                <td>{director.name}</td>
                                <td>{director.birthDate ? director.birthDate.split("T")[0] : "N/A"}</td>
                                <td>{director.nationality || "N/A"}</td>
                                <td>
                                    {director.movies && director.movies.length > 0 ? director.movies.map(m => m.title).join(", ") : "N/A"}
                                </td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(director)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(director._id)}>
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

export default Directors;
