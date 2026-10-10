import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("resetAccountEmail");
        if (!storedEmail) {
            alert("Unauthorized access. Please verify your email first.");
            navigate("/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    const handleReset = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        let updated = false;

        users = users.map((u) => {
            if (u.email === email) {
                updated = true;
                return { ...u, password: newPassword };
            }
            return u;
        });

        if (updated) {
            localStorage.setItem("registeredUsers", JSON.stringify(users));
            sessionStorage.removeItem("resetAccountEmail");
            alert("Password updated successfully! Please log in with your new password.");
            navigate("/login");
        } else {
            alert("Error updating password.");
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
                        <span style={{ fontSize: "2.5rem" }}>🔒</span>
                        <h2 style={{ fontSize: "1.8rem", color: "#1e1b4b", margin: "0.5rem 0 0.25rem 0", fontWeight: "800" }}>
                            Reset Password
                        </h2>
                        <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
                            Resetting password for: <strong>{email}</strong>
                        </p>
                    </div>

                    <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                        
                        {/* New Password */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                                New Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem", boxSizing: "border-box" }}
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem", boxSizing: "border-box" }}
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
                                marginTop: "0.5rem"
                            }}
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;