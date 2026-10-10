import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate credentials against registered users
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const user = users.find(
            (u) => u.email === formData.email && u.password === formData.password && u.role === formData.role
        );

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert(`Welcome back, ${user.name || "User"}!`);
            navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
        } else {
            alert("Invalid email, password, or selected role. Please check and try again.");
        }
    };

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "3rem 1.5rem" }}>
                <div style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "950px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e7ff"
                }}>
                    
                    {/* Left Decorative Banner */}
                    <div style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        padding: "3rem 2.5rem",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <span style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</span>
                        <h2 style={{ fontSize: "2rem", fontWeight: "800", margin: "0 0 1rem 0" }}>Welcome Back!</h2>
                        <p style={{ color: "#e0e7ff", lineHeight: "1.6", margin: 0 }}>
                            Log in to access your course materials, track your progress, and claim your completion certificates.
                        </p>
                    </div>

                    {/* Right Form Container */}
                    <div style={{ flex: 1.2, padding: "3rem 2.5rem" }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#1e1b4b", margin: "0 0 0.5rem 0", fontWeight: "800" }}>
                            Account Login
                        </h2>
                        <p style={{ color: "#64748b", margin: "0 0 2rem 0", fontSize: "0.95rem" }}>
                            Please enter your details to sign in.
                        </p>

                        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                            
                            {/* Role Selector Tabs */}
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#475569", marginBottom: "0.5rem" }}>
                                    I AM LOGGING IN AS:
                                </label>
                                <div style={{ display: "flex", gap: "0.5rem", background: "#f1f5f9", padding: "0.3rem", borderRadius: "8px" }}>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: "student" })}
                                        style={{
                                            flex: 1,
                                            padding: "0.5rem",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: "700",
                                            fontSize: "0.85rem",
                                            background: formData.role === "student" ? "#ffffff" : "transparent",
                                            color: formData.role === "student" ? "#4f46e5" : "#64748b",
                                            boxShadow: formData.role === "student" ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
                                        }}
                                    >
                                        👨‍🎓 Student
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: "admin" })}
                                        style={{
                                            flex: 1,
                                            padding: "0.5rem",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: "700",
                                            fontSize: "0.85rem",
                                            background: formData.role === "admin" ? "#ffffff" : "transparent",
                                            color: formData.role === "admin" ? "#4f46e5" : "#64748b",
                                            boxShadow: formData.role === "admin" ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
                                        }}
                                    >
                                        🛠️ Admin
                                    </button>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.4rem" }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="e.g. alex@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "8px",
                                        border: "1px solid #cbd5e1",
                                        outline: "none",
                                        fontSize: "0.95rem",
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>

                            {/* Password Input with Forgot Password Link */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                                    <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
                                        Password
                                    </label>
                                    <Link to="/forgot-password" style={{ fontSize: "0.8rem", color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>
                                        Forgot Password?
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "8px",
                                        border: "1px solid #cbd5e1",
                                        outline: "none",
                                        fontSize: "0.95rem",
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    padding: "0.85rem",
                                    background: "#10b981",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    marginTop: "0.5rem",
                                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)"
                                }}
                            >
                                Sign In
                            </button>
                        </form>

                        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b", fontSize: "0.9rem" }}>
                            Don't have an account?{" "}
                            <Link to="/register" style={{ color: "#4f46e5", fontWeight: "700", textDecoration: "none" }}>
                                Create Account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;