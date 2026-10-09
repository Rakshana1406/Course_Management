import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageCss from "../components/PageCss";

function MyCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        setEnrolledCourses(enrolled);
    }, []);

    const handleDropCourse = (courseId) => {
        const updated = enrolledCourses.filter(course => course.id !== courseId);
        setEnrolledCourses(updated);
        localStorage.setItem("enrolledCourses", JSON.stringify(updated));
        alert("Course dropped successfully.");
    };

    return (
        <>
            <PageCss href="/css/my-courses.css" />
            <Navbar />

            <div className="container" style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1.5rem" }}>
                <h2 style={{ marginBottom: "1.5rem", color: "#0f172a" }}>My Enrolled Courses</h2>

                {enrolledCourses.length === 0 ? (
                    <div style={{ border: "1px solid #e2e8f0", padding: "2rem", borderRadius: "8px", background: "#fff", textAlign: "center" }}>
                        <p style={{ color: "#64748b", margin: "0 0 1rem 0" }}>You have not enrolled in any courses yet.</p>
                        <Link to="/courses" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>
                            Browse Available Courses →
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {enrolledCourses.map(course => (
                            <div key={course.id} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                                <span style={{ background: "#dcfce7", color: "#166534", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }}>
                                    Enrolled
                                </span>
                                
                                <h3 style={{ margin: "0.75rem 0 0.5rem 0", color: "#1e293b" }}>{course.title}</h3>
                                <p style={{ color: "#64748b", margin: "0.25rem 0" }}>Instructor: {course.instructor}</p>
                                <p style={{ color: "#64748b", margin: "0.25rem 0 1rem 0" }}>Duration: {course.duration}</p>

                                <div style={{ display: "flex", gap: "0.75rem" }}>
                                    {/* Link to start course with dynamic course ID or state */}
                                    <Link 
                                        to={`/start-course?id=${course.id}`}
                                        style={{ 
                                            flex: 1, 
                                            textAlign: "center", 
                                            background: "#2563eb", 
                                            color: "#fff", 
                                            padding: "0.6rem", 
                                            borderRadius: "4px", 
                                            textDecoration: "none", 
                                            fontWeight: "600" 
                                        }}
                                    >
                                        Start Course
                                    </Link>

                                    <button 
                                        onClick={() => handleDropCourse(course.id)}
                                        style={{ 
                                            background: "#fee2e2", 
                                            color: "#991b1b", 
                                            border: "1px solid #fca5a5", 
                                            padding: "0.6rem 1rem", 
                                            borderRadius: "4px", 
                                            cursor: "pointer", 
                                            fontWeight: "600" 
                                        }}
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