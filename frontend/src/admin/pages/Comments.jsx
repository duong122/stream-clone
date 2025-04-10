import React, { useEffect, useState } from "react";
import { getComments, addComment, deleteComment } from "../../services/commentService";
import { getMovies } from "../../services/movieService";
import "bootstrap/dist/css/bootstrap.min.css";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [movies, setMovies] = useState([]);
    const [content, setContent] = useState("");
    const [movie, setMovie] = useState("");
    const [userId, setUserId] = useState(""); // Giả định bạn có userId từ đâu đó

    useEffect(() => {
        // Hard-code userId để test chức năng
        const user = { _id: "67efb693e2c506d5b158fda9", username: "duong_" }; // User giả lập
        localStorage.setItem("user", JSON.stringify(user));  // Lưu vào localStorage
        setUserId(user._id); // Cập nhật userId
        loadComments();
        loadMovies();
    }, []);

    const loadComments = async () => {
        const data = await getComments();
        setComments(data);
    };

    const loadMovies = async () => {
        const data = await getMovies();
        setMovies(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = {
            content,
            movie,
            user: userId, // Sử dụng userId từ localStorage
        };
        await addComment(commentData);
        loadComments();
        setContent("");
        setMovie("");
    };

    const handleDelete = async (id) => {
        await deleteComment(id);
        loadComments();
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Quản lý bình luận</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Nội dung bình luận</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập bình luận"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Chọn phim</label>
                        <select
                            className="form-control"
                            value={movie}
                            onChange={(e) => setMovie(e.target.value)}
                            required
                        >
                            <option value="">-- Chọn phim --</option>
                            {movies.map((m) => (
                                <option key={m._id} value={m._id}>{m.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">Thêm bình luận</button>
                </div>
            </form>

            <table className="table table-bordered shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Phim</th>
                        <th>Nội dung</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">Chưa có bình luận nào</td>
                        </tr>
                    ) : (
                        comments.map((cmt, index) => (
                            <tr key={cmt._id}>
                                <td>{index + 1}</td>
                                <td>{cmt.movie?.title || "N/A"}</td>
                                <td>{cmt.content}</td>
                                <td>{new Date(cmt.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cmt._id)}>
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

export default Comments;
