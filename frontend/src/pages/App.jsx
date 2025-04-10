import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AdminActors from "../admin/AdminDashboard";
import AdminDashboard from "../admin/AdminDashboard";
import Login from "./Login";
import Register from "./Register";

function App() {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;