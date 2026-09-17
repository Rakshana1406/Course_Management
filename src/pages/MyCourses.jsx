import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageCss from "../components/PageCss";

function MyCourses() {
    const [enrolled, setEnrolled] = useState([]);

    // Load enrolled courses from localStorage on component mount
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        setEnrolled(data);
    }, []);

    // Remove course function
    const handleUnenroll = (id) => {
        const updated = enrolled.filter(course => course.id !== id);
        setEnrolled(updated);
        localStorage.setItem("enrolledCourses", JSON.stringify(updated));
    };

    return (
        <>
            <PageCss href="/css/my-courses.css" />
            <Navbar />

            <div className="container" style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1.5rem" }}>
                <h2 style={{ marginBottom: "1.5rem", color: "#0f172a" }}>My Enrolled Courses</h2>

                {enrolled.length === 0 ? (
                    <div style={{ background: "#f8fafc", padding: "2rem", borderRadius: "8px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                        <p style={{ color: "#64748b", margin: 0 }}>You haven't enrolled in any courses yet.</p>
                        <Link 
                            to="/courses" 
                            style={{ display: "inline-block", marginTop: "1rem", color: "#2563eb", fontWeight: "600", textDecoration: "none" }}
                        >
                            Browse Courses to Enroll →
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                        {enrolled.map(course => (
                            <div key={course.id} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                                <span style={{ background: "#dcfce7", color: "#166534", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "12px", fontWeight: "600" }}>
                                    Enrolled
                                </span>
                                <h3 style={{ margin: "0.75rem 0 0.5rem 0", color: "#1e293b" }}>{course.title}</h3>
                                <p style={{ color: "#64748b", margin: "0.25rem 0", fontSize: "14px" }}>Instructor: {course.instructor}</p>
                                <p style={{ color: "#64748b", margin: "0.25rem 0", fontSize: "14px" }}>Duration: {course.duration}</p>
                                
                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
                                    <button 
                                        style={{ flex: 1, background: "#2563eb", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                                    >
                                        Start Course
                                    </button>
                                    <button 
                                        onClick={() => handleUnenroll(course.id)}
                                        style={{ background: "#fee2e2", color: "#991b1b", border: "none", padding: "0.5rem", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                                    >
                                        Drop
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyCourses;