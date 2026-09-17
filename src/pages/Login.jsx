import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function Login() {
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Fetch registered users list from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

        // 2. Check if the user exists
        const foundUser = registeredUsers.find(
            (user) => user.email === email && user.role === role
        );

        if (!foundUser) {
            // User not found -> Block login & prompt to register
            alert("Account not found! Please register first before logging in.");
            navigate(role === "student" ? "/register" : "/admin-register");
            return;
        }

        // 3. Check password
        if (foundUser.password !== password) {
            alert("Incorrect password. Please try again.");
            return;
        }

        // 4. Successful Login -> Save current active session
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        alert("Login successful!");

        // 5. Navigate to dashboard
        if (role === "student") {
            navigate("/dashboard");
        } else {
            navigate("/admin-dashboard");
        }
    };

    return (
        <>
            <PageCss href="/css/login.css" />
            <div className="container" style={{ maxWidth: "400px", margin: "3rem auto", padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff" }}>
                <Link to="/" className="back-btn" style={{ textDecoration: "none", color: "#2563eb", fontWeight: "600" }}>← Back to Home</Link>
                <h2 style={{ marginTop: "1rem" }}>LOGIN PORTAL</h2>
                
                {/* Role Switcher Tabs */}
                <div className="tabs" style={{ display: "flex", gap: "10px", margin: "1.5rem 0" }}>
                    <button 
                        type="button"
                        className={role === "student" ? "active" : ""} 
                        onClick={() => setRole("student")}
                        style={{
                            flex: 1,
                            padding: "0.6rem",
                            cursor: "pointer",
                            background: role === "student" ? "#2563eb" : "#f1f5f9",
                            color: role === "student" ? "#ffffff" : "#1e293b",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            fontWeight: "600"
                        }}
                    >
                        🎓 Student
                    </button>
                    <button 
                        type="button"
                        className={role === "admin" ? "active" : ""} 
                        onClick={() => setRole("admin")}
                        style={{
                            flex: 1,
                            padding: "0.6rem",
                            cursor: "pointer",
                            background: role === "admin" ? "#2563eb" : "#f1f5f9",
                            color: role === "admin" ? "#ffffff" : "#1e293b",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            fontWeight: "600"
                        }}
                    >
                        👨‍💼 Admin
                    </button>
                </div>

                <h3>{role === "student" ? "Student Login" : "Admin Login"}</h3>

                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="input-box" style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                        />
                    </div>
                    <div className="input-box" style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                        />
                    </div>
                    
                    <button type="submit" className="login-btn" style={{ width: "100%", padding: "0.75rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>
                        Login as {role === "student" ? "Student" : "Admin"}
                    </button>
                </form>

                <div className="register" style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    <p style={{ margin: "0.5rem 0", fontSize: "14px", color: "#64748b" }}>
                        {role === "student" ? "Don't have a student account?" : "Don't have an admin account?"}
                    </p>
                    {role === "student" ? (
                        <Link to="/register" style={{ color: "#2563eb", fontWeight: "600" }}>Register Here</Link>
                    ) : (
                        <Link to="/admin-register" style={{ color: "#2563eb", fontWeight: "600" }}>Register Admin Here</Link>
                    )}
                </div>
            </div>
            <LegacyScript src="/legacy/js/login.js" />
        </>
    );
}

export default Login;