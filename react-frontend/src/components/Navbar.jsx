import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <nav style={{ background: "#0f172a", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link to={user?.role === "admin" ? "/admin-dashboard" : "/dashboard"} style={{ color: "#fff", textDecoration: "none", fontSize: "1.25rem", fontWeight: "bold" }}>
                    CourseMS
                </Link>
                
                {/* Visual Role Indicator */}
                {user && (
                    <span style={{
                        background: user.role === "admin" ? "#dc2626" : "#2563eb",
                        color: "#fff",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        textTransform: "uppercase"
                    }}>
                        {user.role === "admin" ? "Admin Portal" : "Student Portal"}
                    </span>
                )}
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <Link to={user?.role === "admin" ? "/admin-dashboard" : "/dashboard"} style={{ color: "#cbd5e1", textDecoration: "none" }}>
                    Dashboard
                </Link>
                <Link to="/courses" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                    Explore Courses
                </Link>

                {user?.role === "student" && (
                    <Link to="/my-courses" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                        My Courses
                    </Link>
                )}

                {user ? (
                    <button 
                        onClick={handleLogout}
                        style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" style={{ background: "#2563eb", color: "#fff", textDecoration: "none", padding: "0.4rem 0.8rem", borderRadius: "4px", fontWeight: "600" }}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;