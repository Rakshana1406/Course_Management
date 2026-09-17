import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Fetch current registered users array
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

        // 2. Check if user already exists
        const userExists = registeredUsers.some(
            (user) => user.email === email && user.role === "student"
        );

        if (userExists) {
            alert("This email is already registered! Redirecting to login...");
            navigate("/login");
            return;
        }

        // 3. Register new student user
        const newUser = {
            name,
            email,
            password,
            role: "student"
        };

        registeredUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

        alert("Registration successful! Please login.");
        navigate("/login");
    };

    return (
        <>
            <PageCss href="/css/student_register.css" />
            <div className="container">
                <Link to="/" className="back-btn">← Back to Home</Link>
                <h2>STUDENT REGISTRATION</h2>
                <form id="studentRegisterForm" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <label>Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn">Register</button>
                </form>
                <div className="register">
                    <h3>Already registered?</h3>
                    <Link to="/login">Login here</Link>
                </div>
            </div>
            <LegacyScript src="/legacy/js/student_register.js" module={true} />
        </>
    );
}

export default Register;