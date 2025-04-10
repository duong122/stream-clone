import React, { useEffect, useState } from "react";
import { getActors, addActor, updateActor, deleteActor } from "../../services/actorService";
import { getMovies } from "../../services/movieService";
import "bootstrap/dist/css/bootstrap.min.css";

const Actors = () => {
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [editingActor, setEditingActor] = useState(null);

    useEffect(() => {
        loadActors();
        loadMovies();
    }, []);

    const loadActors = async () => {
        const data = await getActors();
        setActors(data);
    };

    const loadMovies = async () => {
        const data = await getMovies();
        setMovies(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actorData = { name, birthDate, nationality, movies: selectedMovies, image };
        if (editingActor) {
            await updateActor(editingActor._id, actorData);
        } else {
            await addActor(actorData);
        }
        loadActors();
        resetForm();
    };

    const handleEdit = (actor) => {
        setName(actor.name);
        setBirthDate(actor.birthDate ? actor.birthDate.split("T")[0] : "");
        setNationality(actor.nationality || "");
        setSelectedMovies(actor.movies.map(movie => movie._id));
        setImage(actor.image || "");
        setEditingActor(actor);
    };

    const handleDelete = async (id) => {
        await deleteActor(id);
        loadActors();
    };

    const resetForm = () => {
        setName("");
        setBirthDate("");
        setNationality("");
        setSelectedMovies([]);
        setEditingActor(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý diễn viên</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label">Tên diễn viên</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên diễn viên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Ảnh diễn viên</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập ảnh diễn viên"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Ngày sinh</label>
                        <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Quốc tịch</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập quốc tịch"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Bộ phim đã đóng</label>
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
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editingActor ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingActor && (
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
                        <th>Tên diễn viên</th>
                        <th>Ngày sinh</th>
                        <th>Quốc tịch</th>
                        <th>Phim đã đóng</th>
                        <th>Ảnh diễn viên</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">Chưa có diễn viên nào</td>
                        </tr>
                    ) : (
                        actors.map((actor, index) => (
                            <tr key={actor._id}>
                                <td>{index + 1}</td>
                                <td>{actor.name}</td>
                                <td>{actor.birthDate ? actor.birthDate.split("T")[0] : "N/A"}</td>
                                <td>{actor.nationality || "N/A"}</td>
                                <td>
                                    {actor.movies && actor.movies.length > 0 ? actor.movies.map(m => m.title).join(", ") : "N/A"}
                                </td>
                                <td>{actor.image}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(actor)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(actor._id)}>
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

export default Actors;

    