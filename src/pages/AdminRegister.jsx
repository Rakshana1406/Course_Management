import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function AdminRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminKey, setAdminKey] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Optional: Simple security check for Admin Key
        if (adminKey !== "ADMIN123") {
            alert("Invalid Secret Admin Key!");
            return;
        }

        // 1. Fetch registered users list
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

        // 2. Check if admin user already exists
        const userExists = registeredUsers.some(
            (user) => user.email === email && user.role === "admin"
        );

        if (userExists) {
            alert("This Admin email is already registered! Redirecting to login...");
            navigate("/login");
            return;
        }

        // 3. Register new admin
        const newAdmin = {
            name,
            email,
            password,
            role: "admin"
        };

        registeredUsers.push(newAdmin);
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

        alert("Admin Registration Successful! Please login.");
        navigate("/login");
    };

    return (
        <>
            <PageCss href="/css/admin_register.css" />
            <div className="container" style={{ maxWidth: "420px", margin: "3rem auto", padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff" }}>
                <Link to="/" className="back-btn" style={{ textDecoration: "none", color: "#2563eb", fontWeight: "600" }}>← Back to Home</Link>
                <h2 style={{ marginTop: "1rem" }}>ADMIN REGISTRATION</h2>
                
                <form id="adminRegisterForm" onSubmit={handleSubmit}>
                    <div className="input-box" style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                        />
                    </div>
                    <div className="input-box" style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Admin Email" 
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
                    <div className="input-box" style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Secret Admin Key (Default: ADMIN123)</label>
                        <input 
                            type="password" 
                            placeholder="Enter Admin Key" 
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            required 
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                        />
                    </div>
                    <button type="submit" className="login-btn" style={{ width: "100%", padding: "0.75rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>
                        Register Admin
                    </button>
                </form>

                <div className="register" style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    <p style={{ fontSize: "14px", color: "#64748b" }}>Already registered?</p>
                    <Link to="/login" style={{ color: "#2563eb", fontWeight: "600" }}>Login here</Link>
                </div>
            </div>
            <LegacyScript src="/legacy/js/admin_register.js" module={true} />
        </>
    );
}

export default AdminRegister;