import React, { useEffect, useState } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../../services/movieService";
import { getCategories } from "../../services/categoryService";
import { getStudios } from "../../services/studioService";
import { getDirectors } from "../../services/directorService";
import { getActors } from "../../services/actorService";
import "bootstrap/dist/css/bootstrap.min.css";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [studios, setStudios] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [studio, setStudio] = useState("");
    const [director, setDirector] = useState("");
    const [selectedActors, setSelectedActors] = useState([]);
    const [ratings, setRatings] = useState(0);
    const [image, setImage] = useState(""); 
    const [video, setVideo] = useState(""); 
    const [editingMovie, setEditingMovie] = useState(null);

    useEffect(() => {
        loadMovies();
        loadCategories();
        loadStudios();
        loadDirectors();
        loadActors();
    }, []);

    const loadMovies = async () => {
        const data = await getMovies();
        setMovies(data);
    };

    const loadCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const loadStudios = async () => {
        const data = await getStudios();
        setStudios(data);
    };

    const loadDirectors = async () => {
        const data = await getDirectors();
        setDirectors(data);
    };

    const loadActors = async () => {
        const data = await getActors();
        setActors(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieData = { 
            title, 
            description, 
            releaseDate, 
            duration, 
            category, 
            studio, 
            director, 
            actors: selectedActors, 
            ratings,
            image: image || '', 
            video: video || '' , 
        };
        try {
            if (editingMovie) {
                await updateMovie(editingMovie._id, movieData);
            } else {
                await addMovie(movieData);
            }
            loadMovies();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating movie:', error);
            console.log('video: ', video);
            console.log('image: ', image);
            alert(`Error: ${error.response ? error.response.data.message : error.message}`);
        }
        loadMovies();
        resetForm();
    };

    const handleEdit = (movie) => {
        setTitle(movie.title);
        setDescription(movie.description);
        setReleaseDate(movie.releaseDate ? movie.releaseDate.split("T")[0] : "");
        setDuration(movie.duration);
        setCategory(movie.category._id);
        setStudio(movie.studio._id);
        setDirector(movie.director._id);
        setSelectedActors(movie.actors.map(a => a._id));
        setRatings(movie.ratings);
        setImage(movie.image); 
        setVideo(movie.video); 
        setEditingMovie(movie);
    };

    const handleDelete = async (id) => {
        await deleteMovie(id);
        loadMovies();
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setReleaseDate("");
        setDuration("");
        setCategory("");
        setStudio("");
        setDirector("");
        setSelectedActors([]);
        setRatings(0);
        setImage(""); // Reset image
        setVideo(""); // Reset video
        setEditingMovie(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý phim</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Tên phim</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên phim"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            required
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <label className="form-label">Ngày phát hành</label>
                        <input
                            type="date"
                            className="form-control"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Thời gian (phút)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Nhập thời gian"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Thể loại</label>
                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Chọn thể loại</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Hãng sản xuất</label>
                        <select
                            className="form-control"
                            value={studio}
                            onChange={(e) => setStudio(e.target.value)}
                            required
                        >
                            <option value="">Chọn hãng sản xuất</option>
                            {studios.map(studio => (
                                <option key={studio._id} value={studio._id}>{studio.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <label className="form-label">Đạo diễn</label>
                        <select
                            className="form-control"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            required
                        >
                            <option value="">Chọn đạo diễn</option>
                            {directors.map(director => (
                                <option key={director._id} value={director._id}>{director.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Diễn viên</label>
                        <select
                            multiple
                            className="form-control"
                            value={selectedActors}
                            onChange={(e) =>
                                setSelectedActors(
                                    [...e.target.options].filter(o => o.selected).map(o => o.value)
                                )
                            }
                        >
                            {actors.map(actor => (
                                <option key={actor._id} value={actor._id}>{actor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Đánh giá</label>
                        <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="10"
                            value={ratings}
                            onChange={(e) => setRatings(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Hình ảnh (URL hoặc base64)</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="URL hoặc base64 của hình ảnh"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Video (URL)</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="URL video"
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editingMovie ? "Cập nhật" : "Thêm mới"}
                    </button>
                    {editingMovie && (
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
                        <th>Tên phim</th>
                        <th>Mô tả</th>
                        <th>Ngày phát hành</th>
                        <th>Thể loại</th>
                        <th>Video</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={movie._id}>
                            <td>{index + 1}</td>
                            <td>{movie.title}</td>
                            <td>{movie.description}</td>
                            <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                            <td>{movie.category.name}</td>
                            <td>
                                <a href={movie.video} target="_blank" rel="noopener noreferrer">
                                    Xem video
                                </a>
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(movie)}>
                                    Sửa
                                </button>
                                <button className="btn btn-danger " onClick={() => handleDelete(movie._id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Movies;
