import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    const [title, setTitle] = useState("");
    const [instructor, setInstructor] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const courses = JSON.parse(localStorage.getItem("allCourses") || "[]");
        
        // Match string/number IDs flexibly
        const found = courses.find(c => String(c.id) === String(id));
        
        if (found) {
            setCourse(found);
            setTitle(found.title);
            setInstructor(found.instructor);
            setDuration(found.duration);
            setPrice(found.price);
        }
    }, [id]);

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const courses = JSON.parse(localStorage.getItem("allCourses") || "[]");
        const updatedCourses = courses.map(c => {
            if (String(c.id) === String(id)) {
                return { ...c, title, instructor, duration, price };
            }
            return c;
        });

        localStorage.setItem("allCourses", JSON.stringify(updatedCourses));
        setCourse({ ...course, title, instructor, duration, price });
        setIsEditing(false);
        alert("Course updated successfully!");
    };

    if (!course) {
        return (
            <>
                <Navbar />
                <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "1.5rem", textAlign: "center" }}>
                    <h2>Course Not Found</h2>
                    <p style={{ color: "#64748b" }}>The course you are looking for does not exist in local storage.</p>
                    <Link to="/courses" style={{ color: "#2563eb", fontWeight: "600" }}>← Back to All Courses</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1.5rem", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <Link to="/courses" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>← Back to Courses</Link>
                
                {!isEditing ? (
                    /* Read-Only View (Visible to both Student and Admin) */
                    <div style={{ marginTop: "1.5rem" }}>
                        <h2 style={{ marginTop: 0, color: "#0f172a" }}>{course.title}</h2>
                        <p style={{ color: "#334155", margin: "0.5rem 0" }}><strong>Instructor:</strong> {course.instructor}</p>
                        <p style={{ color: "#334155", margin: "0.5rem 0" }}><strong>Duration:</strong> {course.duration}</p>
                        <p style={{ color: "#0f172a", fontSize: "1.2rem", fontWeight: "bold", margin: "0.5rem 0" }}>Price: {course.price}</p>

                        {/* EDIT BUTTON: Displayed ONLY for Admins */}
                        {user?.role === "admin" && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                style={{ marginTop: "1.5rem", padding: "0.6rem 1.2rem", background: "#f59e0b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                            >
                                ✏️ Edit Course Details
                            </button>
                        )}
                    </div>
                ) : (
                    /* Edit Form View (Admin Only) */
                    <form onSubmit={handleSaveEdit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <h3 style={{ marginTop: 0 }}>Edit Course</h3>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>Instructor</label>
                            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>Duration</label>
                            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
                        </div>
                        
                        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                            <button type="submit" style={{ padding: "0.6rem 1.2rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)} style={{ padding: "0.6rem 1.2rem", background: "#94a3b8", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default CourseDetails;