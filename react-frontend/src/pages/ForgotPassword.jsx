import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");

    const handleVerify = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const foundUser = users.find((u) => u.email === email && u.role === role);

        if (foundUser) {
            // Save temporary verification token/email to pass to reset page
            sessionStorage.setItem("resetAccountEmail", email);
            navigate("/reset-password");
        } else {
            alert("No account found matching this email and role!");
        }
    };

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 1.5rem" }}>
                <div style={{
                    width: "100%",
                    maxWidth: "450px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "2.5rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e0e7ff"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                        <span style={{ fontSize: "2.5rem" }}>🔑</span>
                        <h2 style={{ fontSize: "1.8rem", color: "#1e1b4b", margin: "0.5rem 0 0.25rem 0", fontWeight: "800" }}>
                            Forgot Password?
                        </h2>
                        <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
                            Enter your account email to verify and reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                        
                        {/* Role Selector Tabs */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#475569", marginBottom: "0.4rem" }}>
                                ACCOUNT TYPE:
                            </label>
                            <div style={{ display: "flex", gap: "0.5rem", background: "#f1f5f9", padding: "0.25rem", borderRadius: "8px" }}>
                                <button
                                    type="button"
                                    onClick={() => setRole("student")}
                                    style={{
                                        flex: 1,
                                        padding: "0.45rem",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "700",
                                        fontSize: "0.85rem",
                                        background: role === "student" ? "#ffffff" : "transparent",
                                        color: role === "student" ? "#7c3aed" : "#64748b",
                                        boxShadow: role === "student" ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
                                    }}
                                >
                                    👨‍🎓 Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("admin")}
                                    style={{
                                        flex: 1,
                                        padding: "0.45rem",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "700",
                                        fontSize: "0.85rem",
                                        background: role === "admin" ? "#ffffff" : "transparent",
                                        color: role === "admin" ? "#2563eb" : "#64748b",
                                        boxShadow: role === "admin" ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
                                    }}
                                >
                                    🛠️ Admin
                                </button>
                            </div>
                        </div>

                        {/* Registered Email */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                                Registered Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="alex@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem", boxSizing: "border-box" }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                padding: "0.85rem",
                                background: "#4f46e5",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "700",
                                fontSize: "1rem",
                                cursor: "pointer",
                                marginTop: "0.5rem"
                            }}
                        >
                            Verify Account
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b", fontSize: "0.85rem", margin: "1.5rem 0 0 0" }}>
                        Remember your password?{" "}
                        <Link to="/login" style={{ color: "#4f46e5", fontWeight: "700", textDecoration: "none" }}>
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;