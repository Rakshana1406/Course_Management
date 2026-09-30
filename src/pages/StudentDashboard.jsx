import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function StudentDashboard() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [studentName, setStudentName] = useState("");

    useEffect(() => {
    // 1. Fetch current logged-in student info
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
        setStudentName(currentUser.name || currentUser.email || "Student");
    }

    // 2. Fetch enrolled courses
    const allEnrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    
    // Check either isCompleted or completed flag
    const isCourseCompleted = (course) => course.isCompleted === true || course.completed === true;

    const active = allEnrolled.filter(course => !isCourseCompleted(course));
    const completed = allEnrolled.filter(course => isCourseCompleted(course));

    setEnrolledCourses(active);
    setCompletedCourses(completed);
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1.5rem" }}>
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ color: "#0f172a", marginBottom: "0.5rem" }}>
                        Welcome back, {studentName}! 👋
                    </h1>
                    <p style={{ color: "#64748b", margin: 0 }}>
                        Track your active enrollments and completed certifications here.
                    </p>
                </div>

                {/* --- SECTION 1: ACTIVELY ENROLLED COURSES --- */}
                <section style={{ marginBottom: "3rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h2 style={{ color: "#1e293b", margin: 0 }}>In Progress ({enrolledCourses.length})</h2>
                        <Link to="/courses" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                            + Browse More Courses
                        </Link>
                    </div>

                    {enrolledCourses.length === 0 ? (
                        <div style={{ border: "1px dashed #cbd5e1", padding: "2rem", borderRadius: "8px", textAlign: "center", background: "#f8fafc" }}>
                            <p style={{ color: "#64748b", margin: "0 0 1rem 0" }}>You are not currently taking any active courses.</p>
                            <Link to="/courses" style={{ color: "#2563eb", fontWeight: "600" }}>
                                Explore Courses →
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                            {enrolledCourses.map((course) => (
                                <div key={course.id} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <div>
                                        <span style={{ background: "#dbeafe", color: "#1e40af", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }}>
                                            In Progress
                                        </span>
                                        <h3 style={{ margin: "0.75rem 0 0.5rem 0", color: "#0f172a" }}>{course.title}</h3>
                                        <p style={{ color: "#64748b", margin: "0.25rem 0", fontSize: "0.9rem" }}>Instructor: {course.instructor}</p>
                                    </div>
                                    <Link 
                                        to={`/start-course?id=${course.id}`}
                                        style={{ marginTop: "1.25rem", padding: "0.6rem", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: "4px", textAlign: "center", fontWeight: "600" }}
                                    >
                                        Continue Learning
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* --- SECTION 2: COMPLETED COURSES --- */}
                <section>
                    <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>Completed Courses ({completedCourses.length})</h2>

                    {completedCourses.length === 0 ? (
                        <div style={{ border: "1px dashed #cbd5e1", padding: "2rem", borderRadius: "8px", textAlign: "center", background: "#f8fafc" }}>
                            <p style={{ color: "#64748b", margin: 0 }}>No completed courses yet. Finish a course to earn your certificate!</p>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                            {completedCourses.map((course) => (
                                <div key={course.id} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <div>
                                        <span style={{ background: "#dcfce7", color: "#166534", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }}>
                                            Completed 🎉
                                        </span>
                                        <h3 style={{ margin: "0.75rem 0 0.5rem 0", color: "#0f172a" }}>{course.title}</h3>
                                        <p style={{ color: "#64748b", margin: "0.25rem 0", fontSize: "0.9rem" }}>Instructor: {course.instructor}</p>
                                    </div>
                                    <Link 
                                        to="/certificate"
                                        style={{ marginTop: "1.25rem", padding: "0.6rem", background: "#16a34a", color: "#fff", textDecoration: "none", borderRadius: "4px", textAlign: "center", fontWeight: "600" }}
                                    >
                                        🎓 View Certificate
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

export default StudentDashboard;