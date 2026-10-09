import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PageCss from "../components/PageCss";

function AdminDashboard() {
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [studentsList, setStudentsList] = useState([]);
    
    // New course form inputs
    const [title, setTitle] = useState("");
    const [instructor, setInstructor] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");

    // Function to calculate and update totals from localStorage
    const loadDashboardData = () => {
        // 1. Fetch courses count
        const courses = JSON.parse(localStorage.getItem("allCourses") || "[]");
        setTotalCourses(courses.length);

        // 2. Fetch and filter student accounts count
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const students = users.filter(user => user.role === "student");
        
        setTotalStudents(students.length);
        setStudentsList(students);
    };

    useEffect(() => {
        loadDashboardData();

        // Listen for storage events (updates counts automatically across tabs/actions)
        window.addEventListener("storage", loadDashboardData);
        return () => window.removeEventListener("storage", loadDashboardData);
    }, []);

    const handleAddCourse = (e) => {
        e.preventDefault();

        const currentCourses = JSON.parse(localStorage.getItem("allCourses") || "[]");
        const newCourse = {
            id: Date.now(),
            title,
            instructor,
            duration,
            price: `$${price.replace("$", "")}`,
            category: "General"
        };

        const updatedCourses = [...currentCourses, newCourse];
        localStorage.setItem("allCourses", JSON.stringify(updatedCourses));

        // Reset inputs and update state
        setTitle("");
        setInstructor("");
        setDuration("");
        setPrice("");
        loadDashboardData();
        alert("Course added successfully!");
    };

    return (
        <>
            <PageCss href="/css/admin-dashboard.css" />
            <Navbar />

            <div className="container" style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1.5rem" }}>
                <h2 style={{ marginBottom: "1.5rem", color: "#0f172a" }}>Admin Dashboard</h2>

                {/* Metrics Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
                    <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ margin: 0, color: "#64748b", fontSize: "1rem" }}>Total Courses</h4>
                        <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0 0 0", color: "#2563eb" }}>{totalCourses}</p>
                    </div>

                    <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ margin: 0, color: "#64748b", fontSize: "1rem" }}>Total Students</h4>
                        <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0 0 0", color: "#16a34a" }}>{totalStudents}</p>
                    </div>
                </div>

                {/* Add New Course Section */}
                <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", marginBottom: "2.5rem" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#1e293b" }}>Add New Course</h3>
                    <form onSubmit={handleAddCourse} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <input 
                            type="text" 
                            placeholder="Course Title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                        />
                        <input 
                            type="text" 
                            placeholder="Instructor Name" 
                            value={instructor} 
                            onChange={(e) => setInstructor(e.target.value)} 
                            required 
                            style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                        />
                        <input 
                            type="text" 
                            placeholder="Duration (e.g., 6 Weeks)" 
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)} 
                            required 
                            style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                        />
                        <input 
                            type="text" 
                            placeholder="Price (e.g., 49)" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required 
                            style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                        />
                        <button 
                            type="submit" 
                            style={{ gridColumn: "span 2", padding: "0.75rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                        >
                            + Create Course
                        </button>
                    </form>
                </div>

                {/* Registered Students Table */}
                <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#1e293b" }}>Registered Students</h3>
                    {studentsList.length === 0 ? (
                        <p style={{ color: "#64748b", margin: 0 }}>No registered students found yet.</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                                    <th style={{ padding: "0.5rem" }}>#</th>
                                    <th style={{ padding: "0.5rem" }}>Name</th>
                                    <th style={{ padding: "0.5rem" }}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsList.map((student, idx) => (
                                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                        <td style={{ padding: "0.5rem" }}>{idx + 1}</td>
                                        <td style={{ padding: "0.5rem" }}>{student.name || "N/A"}</td>
                                        <td style={{ padding: "0.5rem" }}>{student.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;