import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AdminActors from "../admin/AdminDashboard";
import AdminDashboard from "../admin/AdminDashboard";
import Login from "./Login";

function App() {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;