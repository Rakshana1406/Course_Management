import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Certificate() {
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [issueDate, setIssueDate] = useState("");

    useEffect(() => {
        // 1. Get current logged-in user
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (!user) {
            alert("Please log in to view your certificate.");
            navigate("/login");
            return;
        }

        // Set student name (fallback to email or "Student" if name isn't set)
        setStudentName(user.name || user.email || "Student");

        // 2. Get completed/enrolled course details
        const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        if (enrolled.length > 0) {
            // Get the most recently accessed/enrolled course
            const latestCourse = enrolled[enrolled.length - 1];
            setCourseTitle(latestCourse.title);
        } else {
            setCourseTitle("Full Stack Web Development");
        }

        // 3. Format current date
        const today = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        setIssueDate(today);
    }, [navigate]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Navbar />

            <div style={{ maxWidth: "850px", margin: "2rem auto", padding: "0 1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <Link to="/my-courses" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                        ← Back to My Courses
                    </Link>
                </div>

                {/* Styled Printable Certificate Container */}
                <div 
                    style={{
                        border: "10px solid #1e3a8a",
                        padding: "2.5rem 1.5rem",
                        background: "#ffffff",
                        textAlign: "center",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        margin: "1rem 0"
                    }}
                >
                    <div style={{ border: "2px solid #cbd5e1", padding: "2rem", borderRadius: "8px" }}>
                        <h1 style={{ fontSize: "2.2rem", color: "#1e3a8a", letterSpacing: "2px", margin: "0 0 1rem 0" }}>
                            CERTIFICATE OF COMPLETION
                        </h1>
                        
                        <p style={{ fontSize: "1rem", color: "#64748b", margin: "0.5rem 0" }}>
                            This is proudly presented to
                        </p>

                        <h2 style={{ fontSize: "2rem", color: "#0f172a", textTransform: "uppercase", borderBottom: "2px solid #2563eb", display: "inline-block", paddingBottom: "0.5rem", margin: "1rem 0" }}>
                            {studentName}
                        </h2>

                        <p style={{ fontSize: "1rem", color: "#64748b", margin: "0.5rem 0" }}>
                            for successfully completing the course
                        </p>

                        <h3 style={{ fontSize: "1.6rem", color: "#2563eb", margin: "1rem 0" }}>
                            {courseTitle}
                        </h3>

                        <p style={{ fontSize: "0.95rem", color: "#64748b", margin: "1.5rem 0 2rem 0" }}>
                            Issued on <strong>{issueDate}</strong> through <strong>CourseMS Platform</strong>
                        </p>

                        {/* Signatures & Seal */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "2.5rem", padding: "0 1rem" }}>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "cursive", fontSize: "1.2rem", margin: "0 0 0.25rem 0", color: "#1e293b" }}>CourseMS Team</p>
                                <div style={{ borderTop: "1px solid #94a3b8", width: "140px", margin: "0 auto" }}></div>
                                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Authorized Signature</span>
                            </div>

                            <div style={{ border: "2px double #2563eb", borderRadius: "50%", width: "70px", height: "70px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: "bold", fontSize: "0.7rem", textAlign: "center" }}>
                                OFFICIAL<br/>SEAL
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "cursive", fontSize: "1.2rem", margin: "0 0 0.25rem 0", color: "#1e293b" }}>Lead Instructor</p>
                                <div style={{ borderTop: "1px solid #94a3b8", width: "140px", margin: "0 auto" }}></div>
                                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Instructor Signature</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <button 
                        onClick={handlePrint}
                        style={{
                            padding: "0.75rem 1.75rem",
                            background: "#16a34a",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "600"
                        }}
                    >
                        🖨️ Print / Save as PDF
                    </button>
                </div>
            </div>
        </>
    );
}

export default Certificate;