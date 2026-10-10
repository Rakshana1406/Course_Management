import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function StartCourse() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const courseId = searchParams.get("id");

    const [course, setCourse] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        // Read enrolled courses from local storage
        const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        const found = enrolled.find(c => String(c.id) === String(courseId)) || enrolled[0];
        setCourse(found);
    }, [courseId]);

    const handleMarkCompleted = () => {
    // 1. Fetch current enrolled courses
    const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");

    // 2. Mark this course as completed using isCompleted: true
    const updatedEnrolled = enrolled.map((c) => {
        if (String(c.id) === String(courseId) || (course && String(c.id) === String(course.id))) {
            return { ...c, isCompleted: true, progress: 100 };
        }
        return c;
    });

    // 3. Save back to localStorage
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolled));

    alert("Congratulations! You have completed the course.");
    navigate(`/certificate?id=${courseId || course?.id}`);
    };

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <Link to="/my-courses" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                        ← Back to My Courses
                    </Link>
                </div>

                <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", padding: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <h1 style={{ marginTop: 0, color: "#0f172a" }}>
                        {course ? course.title : "Course Learning Portal"}
                    </h1>
                    <p style={{ color: "#64748b", marginTop: "-0.5rem" }}>
                        Instructor: <strong>{course?.instructor || "Instructor"}</strong> | Duration: {course?.duration || "Self-Paced"}
                    </p>

                    {/* Navigation Tabs */}
                    <div style={{ display: "flex", gap: "1rem", borderBottom: "2px solid #e2e8f0", margin: "1.5rem 0", paddingBottom: "0.5rem" }}>
                        <button 
                            onClick={() => setActiveTab("overview")}
                            style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "600", color: activeTab === "overview" ? "#2563eb" : "#64748b", borderBottom: activeTab === "overview" ? "2px solid #2563eb" : "none", paddingBottom: "0.5rem" }}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab("modules")}
                            style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "600", color: activeTab === "modules" ? "#2563eb" : "#64748b", borderBottom: activeTab === "modules" ? "2px solid #2563eb" : "none", paddingBottom: "0.5rem" }}
                        >
                            Modules
                        </button>
                    </div>

                    {/* Tab 1: Video & Overview */}
                    {activeTab === "overview" && (
                        <div>
                            <div style={{ background: "#0f172a", color: "#fff", height: "300px", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                                <span style={{ fontSize: "3rem" }}>▶️</span>
                                <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>Introductory Video - {course?.title}</p>
                            </div>

                            <h3>Course Summary</h3>
                            <p style={{ color: "#334155", lineHeight: "1.6" }}>
                                Welcome to {course?.title || "this course"}! Work through the learning materials at your own pace. Once you complete the material, click the completion button below to obtain your verified certificate.
                            </p>
                        </div>
                    )}

                    {/* Tab 2: Module List */}
                    {activeTab === "modules" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <div style={{ padding: "1rem", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#f8fafc" }}>
                                <strong>Module 1:</strong> Introduction and Setup
                            </div>
                            <div style={{ padding: "1rem", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#f8fafc" }}>
                                <strong>Module 2:</strong> Core Architecture & Fundamentals
                            </div>
                            <div style={{ padding: "1rem", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#f8fafc" }}>
                                <strong>Module 3:</strong> Final Hands-On Project
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div style={{ marginTop: "2rem", borderTop: "1px solid #e2e8f0", paddingTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                        <button 
                            onClick={handleMarkCompleted}
                            style={{ 
                                padding: "0.75rem 1.5rem", 
                                background: "#2563eb", 
                                color: "#fff", 
                                border: "none", 
                                borderRadius: "6px", 
                                cursor: "pointer", 
                                fontWeight: "600",
                                fontSize: "1rem"
                            }}
                        >
                            Mark as Completed & View Certificate
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StartCourse;