import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import Navbar from "../components/Navbar";
import PageCss from "../components/PageCss";

const INITIAL_COURSES = [
    { id: 1, title: "Full Stack Web Development", category: "Web Dev", instructor: "Dr. Smith", duration: "8 Weeks", price: "$49" },
    { id: 2, title: "Data Structures & Algorithms", category: "Computer Science", instructor: "Prof. Johnson", duration: "10 Weeks", price: "$59" },
    { id: 3, title: "React & Redux Masterclass", category: "Frontend", instructor: "Jane Doe", duration: "6 Weeks", price: "$39" }
];

function Courses() {
    const navigate = useNavigate(); // 2. Initialize navigate hook
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Read active user state
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    useEffect(() => {
        const stored = localStorage.getItem("allCourses");
        if (stored) {
            setCourses(JSON.parse(stored));
        } else {
            setCourses(INITIAL_COURSES);
            localStorage.setItem("allCourses", JSON.stringify(INITIAL_COURSES));
        }
    }, []);

    const handleEnroll = (course) => {
        // 3. Check if user is logged in
        if (!user) {
            alert("Please log in to enroll in a course.");
            navigate("/login"); // Redirect to login page
            return;
        }

        const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        if (!enrolled.some(c => c.id === course.id)) {
            enrolled.push(course);
            localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
            alert(`Enrolled in ${course.title}!`);
        } else {
            alert("You are already enrolled in this course.");
        }
    };

    const filtered = courses.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <PageCss href="/css/courses.css" />
            
            {/* Navigation Header */}
            <Navbar />

            <div className="container" style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1.5rem" }}>
                {/* Back to Home Link */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <Link to="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                        ← Back to Home
                    </Link>
                </div>

                <input 
                    type="text" 
                    placeholder="Search Courses..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "2rem", boxSizing: "border-box" }}
                />

                <h2 style={{ marginBottom: "1.5rem", color: "#0f172a" }}>Available Courses</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                    {filtered.map(course => (
                        <div key={course.id} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                                <h3 style={{ marginTop: 0, color: "#1e293b" }}>{course.title}</h3>
                                <p style={{ color: "#64748b", margin: "0.5rem 0" }}>Instructor: {course.instructor}</p>
                                <p style={{ color: "#64748b", margin: "0.5rem 0" }}>Duration: {course.duration}</p>
                                <strong style={{ color: "#0f172a", fontSize: "1.1rem", display: "block", marginTop: "0.5rem" }}>{course.price}</strong>
                            </div>

                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
                                {/* View Details (Accessible to both Student and Admin) */}
                                <Link 
                                    to={`/courses/${course.id}`} 
                                    style={{ 
                                        flex: 1, 
                                        textAlign: "center", 
                                        padding: "0.5rem", 
                                        background: "#f1f5f9", 
                                        color: "#1e293b", 
                                        textDecoration: "none", 
                                        borderRadius: "4px", 
                                        fontWeight: "600" 
                                    }}
                                >
                                    View Details
                                </Link>

                                {/* Enroll Button (Shown for Students or guests) */}
                                {user?.role !== "admin" && (
                                    <button 
                                        onClick={() => handleEnroll(course)}
                                        style={{ 
                                            flex: 1, 
                                            background: "#2563eb", 
                                            color: "#fff", 
                                            border: "none", 
                                            padding: "0.5rem", 
                                            borderRadius: "4px", 
                                            cursor: "pointer", 
                                            fontWeight: "600" 
                                        }}
                                    >
                                        Enroll
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Courses;